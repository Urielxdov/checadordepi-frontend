# TanStack Query Migration — Design Spec

## Goal

Migrate state management from Context+Provider+Reducer to TanStack Query + Zustand. Eliminate per-entity providers, wrappers, and contexts. Add URL-synced pagination and persistent cache between navigation. No backend changes.

## Stack additions

```bash
npm install @tanstack/react-query zustand
npm install -D @tanstack/react-query-devtools
```

Versions: `@tanstack/react-query` v5, `zustand` v5.

---

## Architecture

### Layer map

| Layer | Before | After |
|---|---|---|
| Auth state | `AuthContext` + `AuthProvider` | `src/store/authStore.ts` (Zustand) |
| Entity server state | `StudentContext` + `StudentProvider` (×3) | `src/hooks/queries/use*.ts` (TanStack Query) |
| Entity mutations | Inside providers | `src/hooks/mutations/use*Mutations.ts` |
| Route guards | `StudentWrapper`, `TeacherWrapper`, `ProgramWrapper` | Eliminated — all entities under `ProtectedRoute` |
| Form state | `FormReducer`, `UpdateReducer` | Unchanged |
| Services + mappers | `services/*.ts` | Unchanged |
| Interfaces | `interfaces/*.ts` | Unchanged |
| Generic UI | `app/CrudActions/` | Unchanged |

### Data flow

```
Page component
  → useStudents(page)            ← TanStack Query hook
      → getActiveStudents(page, token)  ← existing service function
          → fetch(STUDENTURL)           ← no change
  token from useAuthStore()      ← Zustand, not React Context
```

---

## Section 1: Auth Store (Zustand)

### File: `src/store/authStore.ts`

Replaces `hooks/context/AuthContext.tsx` and `hooks/providers/auth.tsx`.

```ts
interface AuthState {
    token: string
    expiresAt: number       // absolute ms timestamp
    store: (tk: string, durationMs: number) => void
    clear: () => void
}
```

**Behaviors:**
- `store(tk, durationMs)`: computes `expiresAt = Date.now() + durationMs`, persists `{ token, expiresAt }` to `localStorage` under key `"access-token"`, sets state, schedules expiry timer via `setTimeout`.
- `clear()`: removes `"access-token"` from `localStorage`, resets state to `{ token: "", expiresAt: 0 }`, cancels pending timer.
- On store initialization: reads `"access-token"` from `localStorage`. If present and `expiresAt > Date.now()`, restores state and schedules timer with remaining time (`expiresAt - Date.now()`). If expired, calls `clear()`.
- Timer fires: calls `clear()`, then `window.location.replace("/")` (Zustand lives outside React tree).

**localStorage key:** `"access-token"` — same as current implementation, no migration needed.

---

## Section 2: QueryClient

### File: `src/lib/queryClient.ts` (new)

```ts
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 2,   // 2 minutes
            retry: 1,
        },
    },
})
```

### File: `src/main.tsx` (modify)

Wrap app with `QueryClientProvider` using the shared `queryClient` instance. Add `ReactQueryDevtools` in development only.

### File: `src/components/wrappers/AuthWrapper.tsx` (modify)

Remove `AuthProvider` usage. Provide `QueryClientProvider` here so all child routes have access.

```tsx
export default function AuthWrapper() {
    return (
        <QueryClientProvider client={queryClient}>
            <Outlet />
        </QueryClientProvider>
    )
}
```

---

## Section 3: Query Hooks

### Files (new):
- `src/hooks/queries/useStudents.ts`
- `src/hooks/queries/useTeachers.ts`
- `src/hooks/queries/usePrograms.ts`

### Pattern (students as example):

```ts
// List — paginated
export function useStudents(page: number) {
    const { token } = useAuthStore()
    return useQuery({
        queryKey: ['students', page],
        queryFn: () => getActiveStudents(page, token),
        enabled: !!token,
        staleTime: 1000 * 60 * 2,
    })
}

// Single by id
export function useStudent(id: string) {
    const { token } = useAuthStore()
    return useQuery({
        queryKey: ['students', id],
        queryFn: () => getStudent(id, token),
        enabled: !!token && !!id,
    })
}

// Select list (for dropdowns — teachers and programs only)
export function useTeachersSelect() {
    const { token } = useAuthStore()
    return useQuery({
        queryKey: ['teachers', 'select'],
        queryFn: () => getTeachersForSelect(token),
        enabled: !!token,
        staleTime: 1000 * 60 * 10,   // 10 min — rarely changes
    })
}
```

**Query keys:**
| Key | Scope |
|---|---|
| `['students', page]` | paginated list |
| `['students', id]` | single student |
| `['teachers', page]` | paginated list |
| `['teachers', 'select']` | dropdown list |
| `['programs', page]` | paginated list |
| `['programs', 'select']` | dropdown list |

---

## Section 4: Mutation Hooks

### Files (new):
- `src/hooks/mutations/useStudentMutations.ts`
- `src/hooks/mutations/useTeacherMutations.ts`
- `src/hooks/mutations/useProgramMutations.ts`

### Pattern (students as example):

```ts
export function useCreateStudent() {
    const { token } = useAuthStore()
    return useMutation({
        mutationFn: ({ student, foto }: { student: AlumnoModel, foto: File }) =>
            createStudent(student, foto, token),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ['students'] }),
    })
}

export function useUpdateStudent() {
    const { token } = useAuthStore()
    return useMutation({
        mutationFn: ({ student, foto }: { student: AlumnoModel, foto?: File }) =>
            updateStudentA(student, foto, token),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ['students'] }),
    })
}

export function useDeleteStudent() {
    const { token } = useAuthStore()
    return useMutation({
        mutationFn: (id: string) => deleteStudentA(id, token),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ['students'] }),
    })
}
```

`onSuccess` invalidates the entire entity key family → TQ refetches the current page automatically. No manual state updates.

---

## Section 5: Route Changes

### File: `src/App.tsx` (modify)

Remove `StudentWrapper`, `TeacherWrapper`, `ProgramWrapper` from routes. All protected entity routes move directly under `ProtectedRoute`.

```tsx
<Route element={<AuthWrapper />}>
    <Route path='/' element={<LoginView />} />
    <Route path='/logout' element={<Logout />} />
    <Route element={<ProtectedRoute />}>
        <Route path='/home' element={<HomePage />} />
        {/* Alumno */}
        <Route path='/alumno' element={<EntityModules entity='alumno' />} />
        <Route path='/alumno/get' element={<IndexAlu />} />
        <Route path='/alumno/create' element={<CreateAlu />} />
        <Route path='/alumno/delete' element={<DeleteAlu />} />
        <Route path='/alumno/update' element={<UpdateAlu />} />
        <Route path='/alumno/justify' element={<JustifyAlu />} />
        <Route path='/alumno/justify/:id' element={<JustifyOneAlu />} />
        {/* Asesor */}
        <Route path='/asesor' element={<EntityModules entity='asesor' />} />
        <Route path='/asesor/get' element={<IndexProf />} />
        <Route path='/asesor/create' element={<CreateProf />} />
        <Route path='/asesor/delete' element={<DeleteProf />} />
        <Route path='/asesor/update' element={<UpdateProf />} />
        {/* Programa */}
        <Route path='/programa' element={<EntityModules entity='programa' />} />
        <Route path='/programa/get' element={<IndexProg />} />
        <Route path='/programa/create' element={<CreateProg />} />
        <Route path='/programa/delete' element={<DeleteProg />} />
        <Route path='/programa/update' element={<UpdateProg />} />
    </Route>
    {/* Public kiosk routes */}
    <Route path='/asistencia' element={<FacialRecognition />} />
    <Route path='/asistencia/valida' element={<AttendanceChecked />} />
</Route>
```

### File: `src/components/wrappers/ProtectedRoute.tsx` (modify)

Read token from `useAuthStore()` instead of `useAuth()`.

```tsx
import { useAuthStore } from '../../store/authStore'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoute() {
    const { token } = useAuthStore()
    if (!token) return <Navigate to="/" replace />
    return <Outlet />
}
```

---

## Section 6: Page Changes

### Pagination pattern (index pages)

```tsx
// Before: context
const { state, getStudents } = useStudentsCtx()
useEffect(() => getStudents(state.current_page, token), [])

// After: URL-synced
const [searchParams, setSearchParams] = useSearchParams()
const page = Number(searchParams.get('page') ?? 0)
const { data, isLoading, error } = useStudents(page)

const goToPage = (p: number) => setSearchParams({ page: String(p) })
```

### Error handling (per page — decision B)

```tsx
if (error) {
    if ((error as any)?.status === 401) {
        useAuthStore.getState().clear()
        return <Navigate to="/" replace />
    }
    return <p>Error: {error.message}</p>
}
```

### Loading state

```tsx
if (isLoading) return <p>Cargando...</p>
```

### Mutation usage (create page example)

```tsx
const { mutate: create, isPending } = useCreateStudent()

const onSubmit = () => {
    create(
        { student: formData, foto: foto! },
        {
            onSuccess: (result) => {
                if (result.success) navigate('/alumno/get')
                else setError(result.message)
            },
            onError: () => setError('Error al crear alumno'),
        }
    )
}
```

---

## Section 7: LoginForm.tsx

Calls `useAuthStore().store(token, 2040000)` directly instead of `useAuth().store(...)`. No other changes — error state inline already fixed in security branch.

---

## Files Summary

### Created (8 files)
| File | Purpose |
|---|---|
| `src/store/authStore.ts` | Zustand auth store |
| `src/lib/queryClient.ts` | Shared QueryClient instance |
| `src/hooks/queries/useStudents.ts` | Student queries |
| `src/hooks/queries/useTeachers.ts` | Teacher queries |
| `src/hooks/queries/usePrograms.ts` | Program queries |
| `src/hooks/mutations/useStudentMutations.ts` | Student mutations |
| `src/hooks/mutations/useTeacherMutations.ts` | Teacher mutations |
| `src/hooks/mutations/useProgramMutations.ts` | Program mutations |

### Modified (~16 files)
`main.tsx`, `App.tsx`, `AuthWrapper.tsx`, `ProtectedRoute.tsx`, `LoginForm.tsx`, `LogoutView.tsx`, and all entity pages (`IndexAlu`, `CreateAlu`, `UpdateAlu`, `DeleteAlu`, `JustifyAlu`, `JustifyOneAlu`, `IndexProf`, `CreateProf`, `UpdateProf`, `DeleteProf`, `IndexProg`, `CreateProg`, `UpdateProg`, `DeleteProg`).

### Deleted (12 files)
| File |
|---|
| `src/hooks/context/AuthContext.tsx` |
| `src/hooks/context/StudentContext.tsx` |
| `src/hooks/context/TeacherContext.tsx` |
| `src/hooks/context/ProgramContext.tsx` |
| `src/hooks/providers/auth.tsx` |
| `src/hooks/providers/students.tsx` |
| `src/hooks/providers/teachers.tsx` |
| `src/hooks/providers/programs.tsx` |
| `src/hooks/reducers/entities.ts` |
| `src/components/wrappers/StudentWrapper.tsx` |
| `src/components/wrappers/TeacherWrapper.tsx` |
| `src/components/wrappers/ProgramWrapper.tsx` |

### Unchanged
`services/`, `interfaces/`, `utils/`, `app/CrudActions/`, `hooks/reducers/FormReducer.tsx`, `hooks/reducers/UpdateReducer.tsx`, `components/ui/`, `components/interactives/`, `components/FacialRecognition/`, `app/FacialRecognition/`.

---

## Migration order

Execute in this order to avoid breaking the app mid-migration:

1. Install dependencies
2. Create `authStore.ts` + `queryClient.ts`
3. Update `AuthWrapper`, `ProtectedRoute`, `LoginForm`, `LogoutView`
4. Create all query + mutation hooks
5. Update `App.tsx` routes (remove wrappers)
6. Update all entity pages one entity at a time (Alumno → Profesor → Programa)
7. Delete obsolete files
8. Verify TypeScript compiles clean (`tsc --noEmit`)
