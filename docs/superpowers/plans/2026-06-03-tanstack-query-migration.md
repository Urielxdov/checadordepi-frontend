# TanStack Query Migration — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all Context+Provider+Reducer entity state with TanStack Query + Zustand auth store, eliminating 12 files and adding URL-synced pagination and persistent cross-navigation cache.

**Architecture:** Zustand manages auth state (token, timer); TanStack Query manages all server state (students, teachers, programs). Services layer is untouched. Pages import hooks directly — no wrappers, no contexts. Migration order ensures the app compiles at every step.

**Tech Stack:** React 19, TypeScript, Vite 6, @tanstack/react-query v5, zustand v5, React Router v7

---

## File Map

### Created (8 files)
| File | Purpose |
|---|---|
| `src/store/authStore.ts` | Zustand auth — token, timer, localStorage |
| `src/lib/queryClient.ts` | Shared QueryClient singleton |
| `src/hooks/queries/useStudents.ts` | Student list + single queries |
| `src/hooks/queries/useTeachers.ts` | Teacher list + select queries |
| `src/hooks/queries/usePrograms.ts` | Program list + select queries |
| `src/hooks/mutations/useStudentMutations.ts` | Student create/update/delete |
| `src/hooks/mutations/useTeacherMutations.ts` | Teacher create/update/delete |
| `src/hooks/mutations/useProgramMutations.ts` | Program create/update/delete |

### Modified (~16 files)
`main.tsx`, `App.tsx`, `AuthWrapper.tsx`, `ProtectedRoute.tsx`, `LoginForm.tsx`, `LogoutView.tsx`, `IndexAlu`, `CreateAlu`, `UpdateAlu`, `DeleteAlu`, `JustifyAlu`, `JustifyOneAlu`, `IndexProf`, `CreateProf`, `UpdateProf`, `DeleteProf`, `IndexProg`, `CreateProg`, `UpdateProg`, `DeleteProg`

### Deleted (12 files)
`hooks/context/AuthContext.tsx`, `hooks/context/StudentContext.tsx`, `hooks/context/TeacherContext.tsx`, `hooks/context/ProgramContext.tsx`, `hooks/providers/auth.tsx`, `hooks/providers/students.tsx`, `hooks/providers/teachers.tsx`, `hooks/providers/programs.tsx`, `hooks/reducers/entities.ts`, `components/wrappers/StudentWrapper.tsx`, `components/wrappers/TeacherWrapper.tsx`, `components/wrappers/ProgramWrapper.tsx`

---

## Task 1: Install Dependencies

**Files:** `package.json` (modified by npm)

- [ ] **Step 1.1: Install runtime deps**

```bash
cd /home/uhernand/checadordepi-frontend
npm install @tanstack/react-query zustand
npm install -D @tanstack/react-query-devtools
```

Expected: no errors, `package.json` updated.

- [ ] **Step 1.2: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install @tanstack/react-query v5 and zustand v5"
```

---

## Task 2: Create authStore + queryClient

**Files:**
- Create: `src/store/authStore.ts`
- Create: `src/lib/queryClient.ts`

- [ ] **Step 2.1: Create `src/store/authStore.ts`**

```ts
import { create } from 'zustand'

const TOKEN_KEY = 'access-token'

interface AuthState {
    token: string
    expiresAt: number
    store: (tk: string, durationMs: number) => void
    clear: () => void
}

let expiryTimer: ReturnType<typeof setTimeout> | null = null

function scheduleExpiry(expiresAt: number, clearFn: () => void) {
    if (expiryTimer) clearTimeout(expiryTimer)
    const remaining = expiresAt - Date.now()
    if (remaining <= 0) {
        clearFn()
        return
    }
    expiryTimer = setTimeout(() => {
        clearFn()
        window.location.replace('/')
    }, remaining)
}

function readLocalStorage(): { token: string; expiresAt: number } | null {
    try {
        const raw = localStorage.getItem(TOKEN_KEY)
        if (!raw) return null
        const parsed = JSON.parse(raw) as { token: string; expiresAt: number }
        if (parsed.expiresAt > Date.now()) return parsed
        localStorage.removeItem(TOKEN_KEY)
        return null
    } catch {
        localStorage.removeItem(TOKEN_KEY)
        return null
    }
}

const saved = readLocalStorage()

export const useAuthStore = create<AuthState>((set, get) => {
    if (saved) {
        scheduleExpiry(saved.expiresAt, () => get().clear())
    }

    return {
        token: saved?.token ?? '',
        expiresAt: saved?.expiresAt ?? 0,

        store: (tk: string, durationMs: number) => {
            const expiresAt = Date.now() + durationMs
            localStorage.removeItem(TOKEN_KEY)
            localStorage.setItem(TOKEN_KEY, JSON.stringify({ token: tk, expiresAt }))
            set({ token: tk, expiresAt })
            scheduleExpiry(expiresAt, () => get().clear())
        },

        clear: () => {
            localStorage.removeItem(TOKEN_KEY)
            if (expiryTimer) clearTimeout(expiryTimer)
            expiryTimer = null
            set({ token: '', expiresAt: 0 })
        },
    }
})
```

- [ ] **Step 2.2: Create `src/lib/queryClient.ts`**

```ts
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 2,
            retry: 1,
        },
    },
})
```

- [ ] **Step 2.3: Commit**

```bash
git add src/store/authStore.ts src/lib/queryClient.ts
git commit -m "feat: add Zustand auth store and TanStack QueryClient"
```

---

## Task 3: Wire QueryClientProvider into App shell

**Files:**
- Modify: `src/main.tsx`
- Modify: `src/components/wrappers/AuthWrapper.tsx`

- [ ] **Step 3.1: Read current files**

Read:
- `src/main.tsx`
- `src/components/wrappers/AuthWrapper.tsx`

- [ ] **Step 3.2: Update `src/main.tsx`**

Add ReactQueryDevtools in development. Replace full content:

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient } from './lib/queryClient'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
        {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
)
```

- [ ] **Step 3.3: Simplify `src/components/wrappers/AuthWrapper.tsx`**

AuthWrapper no longer provides AuthProvider — QueryClientProvider is in main.tsx. Replace full content:

```tsx
import { Outlet } from "react-router-dom"

export default function AuthWrapper() {
    return <Outlet />
}
```

- [ ] **Step 3.4: Commit**

```bash
git add src/main.tsx src/components/wrappers/AuthWrapper.tsx
git commit -m "feat: wire QueryClientProvider into app root"
```

---

## Task 4: Update ProtectedRoute + LoginForm + LogoutView

**Files:**
- Modify: `src/components/wrappers/ProtectedRoute.tsx`
- Modify: `src/app/HomeMenu/LoginForm.tsx`
- Modify: `src/app/HomeMenu/LogoutView.tsx`

- [ ] **Step 4.1: Read current files**

Read:
- `src/components/wrappers/ProtectedRoute.tsx`
- `src/app/HomeMenu/LoginForm.tsx`
- `src/app/HomeMenu/LogoutView.tsx`

- [ ] **Step 4.2: Rewrite `src/components/wrappers/ProtectedRoute.tsx`**

```tsx
import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../../store/authStore"

export default function ProtectedRoute() {
    const { token } = useAuthStore()
    if (!token) return <Navigate to="/" replace />
    return <Outlet />
}
```

- [ ] **Step 4.3: Rewrite `src/app/HomeMenu/LoginForm.tsx`**

```tsx
import { useNavigate } from "react-router-dom"
import { getFieldsLog } from "../../utils/Fields"
import type { FieldConfig } from "../../utils/Fields"
import { type LoginModel } from "../../interfaces/Models"
import Form from "../../components/interactives/forms/Form"
import Input from "../../components/interactives/forms/Input"
import Button from "../../components/interactives/buttons/Button"
import logoTec from '../../assets/logo_login_tecnm.png'
import logoITL from '../../assets/110053_login.png'
import { useForm } from "../../hooks/reducers/FormReducer"
import { validateAccess } from "../../services/userService"
import { useAuthStore } from "../../store/authStore"
import { useEffect, useState } from "react"

function LoginView() {
    const { store, clear } = useAuthStore()
    const { state, handleChange, resetForm } = useForm('Login')
    const navigate = useNavigate()
    const [error, setError] = useState<string | null>(null)

    useEffect(() => { clear() }, [])

    const onSubmit = () => {
        setError(null)
        const login = state.data as LoginModel
        validateAccess(login)
            .then(token => {
                if (token) {
                    store(token, 2040000)
                    navigate("/home")
                } else {
                    setError("Credenciales inválidas. Intente de nuevo.")
                }
                resetForm()
            })
            .catch(() => {
                setError("Credenciales inválidas. Intente de nuevo.")
                resetForm()
            })
    }

    return (
        <div className="w-full h-full fixed inset-0 bg-indigo-950 flex items-center justify-center">
            <div className="bg-white rounded-lg w-230 h-150 flex flex-row">
                <div>
                    <img className="h-150 w-100 rounded-lg object-cover" src={logoTec} alt="Logo del tec" />
                </div>
                <div className="flex flex-col grow justify-center">
                    <div className="px-6 py-2">
                        <img src={logoITL} alt="logo itl" className="max-w-100" />
                        <h2 className="text-xl text-left">Sistema de gestion de alumnos</h2>
                    </div>
                    {error && (
                        <p className="mx-6 mb-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
                            {error}
                        </p>
                    )}
                    <Form id="login-form" onSubmit={onSubmit}>
                        {getFieldsLog(state.data as LoginModel).map((f: FieldConfig) => (
                            <Input
                                label={f.label}
                                name={f.name}
                                type={f.type}
                                required={true}
                                maxLength={f.maxlength ? f.maxlength : 200}
                                minLength={f.minlength ? f.minlength : 1}
                                change={handleChange}
                                value={f.value}
                                key={f.name}
                            />
                        ))}
                        <Button
                            text='Acceder'
                            action={() => {}}
                            submit={true}
                            styles='px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 hover:cursor-pointer'
                        />
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default LoginView
```

- [ ] **Step 4.4: Rewrite `src/app/HomeMenu/LogoutView.tsx`**

```tsx
import { Link } from "react-router-dom"
import { useEffect } from "react"
import HomeLayout from "../../components/ui/HomeLayout"
import { useAuthStore } from "../../store/authStore"

function Logout() {
    const { clear } = useAuthStore()

    useEffect(() => { clear() }, [])

    return (
        <HomeLayout title="Sesion terminada">
            <>
                <p className="text-center">La sesion se ha cerrado o ha expirado, para volver a ingresar de click en el enlace</p>
                <Link className="text-blue-600 text-center" to="/">volver a acceder</Link>
            </>
        </HomeLayout>
    )
}

export default Logout
```

- [ ] **Step 4.5: Commit**

```bash
git add src/components/wrappers/ProtectedRoute.tsx \
        src/app/HomeMenu/LoginForm.tsx \
        src/app/HomeMenu/LogoutView.tsx
git commit -m "feat: migrate auth consumers to useAuthStore"
```

---

## Task 5: Create entity query hooks

**Files:**
- Create: `src/hooks/queries/useStudents.ts`
- Create: `src/hooks/queries/useTeachers.ts`
- Create: `src/hooks/queries/usePrograms.ts`

- [ ] **Step 5.1: Create `src/hooks/queries/useStudents.ts`**

```ts
import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '../../store/authStore'
import { getActiveStudents, getStudent } from '../../services/studentsService'

export function useStudents(page: number) {
    const { token } = useAuthStore()
    return useQuery({
        queryKey: ['students', page],
        queryFn: () => getActiveStudents(page, token),
        enabled: !!token,
    })
}

export function useStudent(id: string) {
    const { token } = useAuthStore()
    return useQuery({
        queryKey: ['students', id],
        queryFn: () => getStudent(id, token),
        enabled: !!token && !!id,
    })
}
```

- [ ] **Step 5.2: Create `src/hooks/queries/useTeachers.ts`**

```ts
import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '../../store/authStore'
import { getActiveTeachers, getTeacherSelect } from '../../services/teacherService'

export function useTeachers(page: number) {
    const { token } = useAuthStore()
    return useQuery({
        queryKey: ['teachers', page],
        queryFn: () => getActiveTeachers(page, token),
        enabled: !!token,
    })
}

export function useTeachersSelect() {
    const { token } = useAuthStore()
    return useQuery({
        queryKey: ['teachers', 'select'],
        queryFn: () => getTeacherSelect(token),
        enabled: !!token,
        staleTime: 1000 * 60 * 10,
    })
}
```

- [ ] **Step 5.3: Create `src/hooks/queries/usePrograms.ts`**

```ts
import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '../../store/authStore'
import { getActivePrograms, getProgramSelect } from '../../services/programService'

export function usePrograms(page: number) {
    const { token } = useAuthStore()
    return useQuery({
        queryKey: ['programs', page],
        queryFn: () => getActivePrograms(page, token),
        enabled: !!token,
    })
}

export function useProgramsSelect() {
    const { token } = useAuthStore()
    return useQuery({
        queryKey: ['programs', 'select'],
        queryFn: () => getProgramSelect(token),
        enabled: !!token,
        staleTime: 1000 * 60 * 10,
    })
}
```

- [ ] **Step 5.4: Commit**

```bash
git add src/hooks/queries/useStudents.ts \
        src/hooks/queries/useTeachers.ts \
        src/hooks/queries/usePrograms.ts
git commit -m "feat: add TanStack Query hooks for students, teachers, programs"
```

---

## Task 6: Create entity mutation hooks

**Files:**
- Create: `src/hooks/mutations/useStudentMutations.ts`
- Create: `src/hooks/mutations/useTeacherMutations.ts`
- Create: `src/hooks/mutations/useProgramMutations.ts`

- [ ] **Step 6.1: Create `src/hooks/mutations/useStudentMutations.ts`**

```ts
import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '../../store/authStore'
import { queryClient } from '../../lib/queryClient'
import { createStudent, updateStudentA, deleteStudentA } from '../../services/studentsService'
import type { AlumnoModel } from '../../interfaces/Models'

export function useCreateStudent() {
    const { token } = useAuthStore()
    return useMutation({
        mutationFn: ({ student, foto }: { student: AlumnoModel; foto: File }) =>
            createStudent(student, foto, token),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['students'] }),
    })
}

export function useUpdateStudent() {
    const { token } = useAuthStore()
    return useMutation({
        mutationFn: ({ student, foto }: { student: AlumnoModel; foto?: File }) =>
            updateStudentA(student, foto, token),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['students'] }),
    })
}

export function useDeleteStudent() {
    const { token } = useAuthStore()
    return useMutation({
        mutationFn: (id: string) => deleteStudentA(id, token),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['students'] }),
    })
}
```

- [ ] **Step 6.2: Create `src/hooks/mutations/useTeacherMutations.ts`**

```ts
import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '../../store/authStore'
import { queryClient } from '../../lib/queryClient'
import { createTeacher, updateTeacherA, deleteTeacherA } from '../../services/teacherService'
import type { ProfesorModel } from '../../interfaces/Models'

export function useCreateTeacher() {
    const { token } = useAuthStore()
    return useMutation({
        mutationFn: (teacher: ProfesorModel) => createTeacher(teacher, token),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['teachers'] }),
    })
}

export function useUpdateTeacher() {
    const { token } = useAuthStore()
    return useMutation({
        mutationFn: (teacher: ProfesorModel) => updateTeacherA(teacher, token),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['teachers'] }),
    })
}

export function useDeleteTeacher() {
    const { token } = useAuthStore()
    return useMutation({
        mutationFn: (id: string) => deleteTeacherA(id, token),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['teachers'] }),
    })
}
```

- [ ] **Step 6.3: Create `src/hooks/mutations/useProgramMutations.ts`**

```ts
import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '../../store/authStore'
import { queryClient } from '../../lib/queryClient'
import { createProgram, updateProgramA, deleteProgramA } from '../../services/programService'
import type { ProgramaModel } from '../../interfaces/Models'

export function useCreateProgram() {
    const { token } = useAuthStore()
    return useMutation({
        mutationFn: (program: ProgramaModel) => createProgram(program, token),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['programs'] }),
    })
}

export function useUpdateProgram() {
    const { token } = useAuthStore()
    return useMutation({
        mutationFn: (program: ProgramaModel) => updateProgramA(program, token),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['programs'] }),
    })
}

export function useDeleteProgram() {
    const { token } = useAuthStore()
    return useMutation({
        mutationFn: (id: string) => deleteProgramA(id, token),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['programs'] }),
    })
}
```

- [ ] **Step 6.4: Commit**

```bash
git add src/hooks/mutations/useStudentMutations.ts \
        src/hooks/mutations/useTeacherMutations.ts \
        src/hooks/mutations/useProgramMutations.ts
git commit -m "feat: add TanStack Query mutation hooks for all entities"
```

---

## Task 7: Update App.tsx routes

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 7.1: Read `src/App.tsx`**

- [ ] **Step 7.2: Replace full content of `src/App.tsx`**

```tsx
import './App.css'
import { Route, Routes } from 'react-router-dom'

// pages
import LoginView from './app/HomeMenu/LoginForm'
import Logout from './app/HomeMenu/LogoutView'
import HomePage from './app/HomeMenu/HomePages'
import EntityModules from './app/HomeMenu/EntityModules'
import CreateAlu from './app/AlumnoPages/register'
import IndexAlu from './app/AlumnoPages'
import UpdateAlu from './app/AlumnoPages/update'
import DeleteAlu from './app/AlumnoPages/delete'
import IndexProf from './app/ProfesorPages'
import CreateProf from './app/ProfesorPages/register'
import DeleteProf from './app/ProfesorPages/delete'
import UpdateProf from './app/ProfesorPages/update'
import IndexProg from './app/ProgramaPages'
import CreateProg from './app/ProgramaPages/register'
import DeleteProg from './app/ProgramaPages/delete'
import FacialRecognition from './app/FacialRecognition/FacialRecognition'
import AttendanceChecked from './app/FacialRecognition/AttendanceChecked'
import JustifyAlu from './app/AlumnoPages/justify'
import JustifyOneAlu from './app/AlumnoPages/justifyone'
import UpdateProg from './app/ProgramaPages/update'

// wrappers
import AuthWrapper from './components/wrappers/AuthWrapper'
import ProtectedRoute from './components/wrappers/ProtectedRoute'

function App() {
    return (
        <Routes>
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

                {/* Public kiosk routes — intentionally outside ProtectedRoute, no login required */}
                <Route path='/asistencia' element={<FacialRecognition />} />
                <Route path='/asistencia/valida' element={<AttendanceChecked />} />
            </Route>
        </Routes>
    )
}

export default App
```

- [ ] **Step 7.3: Commit**

```bash
git add src/App.tsx
git commit -m "feat: remove entity wrappers from routes, flatten under ProtectedRoute"
```

---

## Task 8: Migrate Alumno pages

**Files:**
- Modify: `src/app/AlumnoPages/index.tsx`
- Modify: `src/app/AlumnoPages/register.tsx`
- Modify: `src/app/AlumnoPages/update.tsx`
- Modify: `src/app/AlumnoPages/delete.tsx`
- Modify: `src/app/AlumnoPages/justify.tsx`
- Modify: `src/app/AlumnoPages/justifyone.tsx`

- [ ] **Step 8.1: Read all 6 files**

Read each file before editing.

- [ ] **Step 8.2: Rewrite `src/app/AlumnoPages/index.tsx`**

```tsx
import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { ALUMNOHEADERS } from "../../utils/Headers"
import ReturnButton from "../../components/interactives/buttons/ReturnButton"
import HomeLayout from "../../components/ui/HomeLayout"
import Index from "../CrudActions/Index"
import PageBar from "../../components/ui/pageBar"
import { useStudents } from "../../hooks/queries/useStudents"
import type { AlumnoModel } from "../../interfaces/Models"

function IndexAlu() {
    const [searchParams, setSearchParams] = useSearchParams()
    const page = Number(searchParams.get('page') ?? 0)
    const [current, setCurrent] = useState<AlumnoModel | undefined>()
    const { data, isLoading } = useStudents(page)

    const onSearch = (id: string) => {
        setCurrent(data?.data.find(s => s.id === id))
    }

    if (isLoading) return (
        <HomeLayout title="Lista de alumnos">
            <p className="text-center">Cargando...</p>
        </HomeLayout>
    )

    return (
        <HomeLayout title="Lista de alumnos">
            <Index
                headers={ALUMNOHEADERS}
                body={data?.data ?? []}
                onSearch={onSearch}
                entity={current}
            />
            <PageBar
                current={page}
                total={data?.total ?? 0}
                onChange={(p: number) => setSearchParams({ page: String(p) })}
            />
            <ReturnButton path="/alumno/" />
        </HomeLayout>
    )
}

export default IndexAlu
```

- [ ] **Step 8.3: Rewrite `src/app/AlumnoPages/register.tsx`**

```tsx
import ReturnButton from "../../components/interactives/buttons/ReturnButton"
import Create from "../CrudActions/Create"
import HomeLayout from "../../components/ui/HomeLayout"
import { getFieldsAlu } from "../../utils/Fields"
import type { AlumnoModel } from "../../interfaces/Models"
import { useForm } from "../../hooks/reducers/FormReducer"
import Modal from "../../components/ui/Modals"
import { useState } from "react"
import type { SelectItem } from "../../interfaces/httpModels"
import debounce from "../../utils/Debounce"
import { useCreateStudent } from "../../hooks/mutations/useStudentMutations"
import { useTeachersSelect } from "../../hooks/queries/useTeachers"
import { useProgramsSelect } from "../../hooks/queries/usePrograms"

function CreateAlu() {
    const [openSuccess, setOpenSuccess] = useState(false)
    const [openFail, setOpenFail] = useState(false)
    const { state, handleChange, resetForm } = useForm('Alumno')
    const { mutate: create } = useCreateStudent()
    const { data: teacherItems } = useTeachersSelect()
    const { data: programItems } = useProgramsSelect()

    const itemsPf: SelectItem[] = [
        { key: "default", fullName: "-- seleccione un profesor --" },
        ...(teacherItems ?? [])
    ]
    const itemsPr: SelectItem[] = [
        { key: "default", fullName: "-- seleccione un programa --" },
        ...(programItems ?? [])
    ]

    const onSubmit = debounce(() => {
        const alumno = state.data as AlumnoModel
        alumno.status = "Activo"
        create(
            { student: alumno, foto: alumno.foto as File },
            {
                onSuccess: (result) => {
                    if (result.success) setOpenSuccess(true)
                    else setOpenFail(true)
                    resetForm()
                },
                onError: () => { setOpenFail(true); resetForm() }
            }
        )
    }, 500)

    return (
        <>
            <HomeLayout title="Modulo Alumno">
                <Create
                    module="Alumno"
                    fields={getFieldsAlu(state.data as AlumnoModel)}
                    itemsPf={itemsPf}
                    itemsPr={itemsPr}
                    onSubmit={onSubmit}
                    onChange={handleChange}
                />
                <ReturnButton path="/alumno/" />
            </HomeLayout>
            <Modal title="Alumno creado" message="el alumno ha sido creado con exito" type="success" isOpen={openSuccess} onClose={() => setOpenSuccess(false)} />
            <Modal title="Error al crear" message="el alumno no ha sido creado" type="failure" isOpen={openFail} onClose={() => setOpenFail(false)} />
        </>
    )
}

export default CreateAlu
```

- [ ] **Step 8.4: Rewrite `src/app/AlumnoPages/update.tsx`**

```tsx
import UpdateForm from "../CrudActions/UpdateForm"
import HomeLayout from "../../components/ui/HomeLayout"
import ReturnButton from "../../components/interactives/buttons/ReturnButton"
import { type AlumnoModel } from "../../interfaces/Models"
import Modal from "../../components/ui/Modals"
import { useEffect, useState } from "react"
import { getFieldsAlu } from "../../utils/Fields"
import { useForm } from "../../hooks/reducers/FormReducer"
import type { SelectItem } from "../../interfaces/httpModels"
import QueryInput from "../../components/interactives/inputs/QueryInput"
import CheckBox from "../../components/interactives/inputs/Checkbox"
import debounce from "../../utils/Debounce"
import { useSearchParams } from "react-router-dom"
import { useStudents } from "../../hooks/queries/useStudents"
import { useUpdateStudent } from "../../hooks/mutations/useStudentMutations"
import { useTeachersSelect } from "../../hooks/queries/useTeachers"
import { useProgramsSelect } from "../../hooks/queries/usePrograms"

function UpdateAlu() {
    const [openSuccess, setOpenSuccess] = useState(false)
    const [openFail, setOpenFail] = useState(false)
    const [check, setCheck] = useState(false)
    const [current, setCurrent] = useState<AlumnoModel | undefined>()
    const [searchParams] = useSearchParams()
    const page = Number(searchParams.get('page') ?? 0)
    const { data } = useStudents(page)
    const { mutate: update } = useUpdateStudent()
    const { data: teacherItems } = useTeachersSelect()
    const { data: programItems } = useProgramsSelect()
    const { state, handleChange, setValue, resetForm } = useForm("Alumno")

    const itemsPf: SelectItem[] = [
        { key: "default", fullName: "-- seleccione un profesor --" },
        ...(teacherItems ?? [])
    ]
    const itemsPr: SelectItem[] = [
        { key: "default", fullName: "-- seleccione un programa --" },
        ...(programItems ?? [])
    ]

    const onSearch = (id: string) => {
        setCurrent(data?.data.find(s => s.id === id))
    }

    useEffect(() => {
        if (current) setValue(current)
    }, [current])

    const onUpdate = debounce(() => {
        const alumno = state.data as AlumnoModel
        update(
            { student: alumno, foto: check ? alumno.foto as File : undefined },
            {
                onSuccess: (result) => {
                    if (result.success) setOpenSuccess(true)
                    else setOpenFail(true)
                    resetForm()
                    setCurrent(undefined)
                },
                onError: () => { setOpenFail(true); resetForm() }
            }
        )
    }, 500)

    if (!current) {
        return (
            <HomeLayout title="Modulo Alumno">
                <QueryInput action={onSearch} placeholder="buscar alumno" />
                <p className="text-center">sin registro</p>
                <ReturnButton path="/alumno/" />
            </HomeLayout>
        )
    }

    return (
        <>
            <HomeLayout title="Modulo Alumno">
                <QueryInput action={onSearch} placeholder="buscar alumno" />
                <UpdateForm
                    module="Alumno"
                    fields={check ? getFieldsAlu(state.data as AlumnoModel).slice(1) : getFieldsAlu(state.data as AlumnoModel).slice(1, 7)}
                    itemsPf={itemsPf}
                    itemsPr={itemsPr}
                    selectPf={(state.data as AlumnoModel).profesor}
                    selectPr={(state.data as AlumnoModel).programa}
                    onSubmit={onUpdate}
                    onChange={handleChange}
                />
                <CheckBox text="actualizar foto" onChange={setCheck} />
                <ReturnButton path="/alumno/" />
            </HomeLayout>
            <Modal title="Alumno actualizado" message="los datos del alumnos se han actualizado" type="success" isOpen={openSuccess} onClose={() => setOpenSuccess(false)} />
            <Modal title="Error al actualizar" message="el alumno no ha sido actualizado" type="failure" isOpen={openFail} onClose={() => setOpenFail(false)} />
        </>
    )
}

export default UpdateAlu
```

- [ ] **Step 8.5: Rewrite `src/app/AlumnoPages/delete.tsx`**

```tsx
import Delete from "../CrudActions/Delete"
import HomeLayout from "../../components/ui/HomeLayout"
import ReturnButton from "../../components/interactives/buttons/ReturnButton"
import { ALUMNOHEADERS } from "../../utils/Headers"
import Modal from "../../components/ui/Modals"
import { useState } from "react"
import PageBar from "../../components/ui/pageBar"
import debounce from "../../utils/Debounce"
import { useSearchParams } from "react-router-dom"
import { useStudents } from "../../hooks/queries/useStudents"
import { useDeleteStudent } from "../../hooks/mutations/useStudentMutations"
import type { AlumnoModel } from "../../interfaces/Models"

function DeleteAlu() {
    const [openSuccess, setOpenSuccess] = useState(false)
    const [openFail, setOpenFail] = useState(false)
    const [current, setCurrent] = useState<AlumnoModel | undefined>()
    const [searchParams, setSearchParams] = useSearchParams()
    const page = Number(searchParams.get('page') ?? 0)
    const { data } = useStudents(page)
    const { mutate: remove } = useDeleteStudent()

    const onSearch = (id: string) => {
        setCurrent(data?.data.find(s => s.id === id))
    }

    const drop = (id: string) => {
        debounce(() => {
            remove(id, {
                onSuccess: (result) => {
                    if (result.success) { setOpenSuccess(true); setCurrent(undefined) }
                    else setOpenFail(true)
                },
                onError: () => setOpenFail(true)
            })
        }, 500)()
    }

    return (
        <>
            <HomeLayout title="Modulo Alumno">
                <Delete
                    module="alumno"
                    headers={ALUMNOHEADERS}
                    entity={current}
                    all={data?.data ?? []}
                    onSearch={onSearch}
                    onDelete={drop}
                />
                <PageBar
                    current={page}
                    total={data?.total ?? 0}
                    onChange={(p: number) => setSearchParams({ page: String(p) })}
                />
                <ReturnButton path="/alumno/" />
            </HomeLayout>
            <Modal title="Alumno eliminado" message="el alumno ha sido eliminado con exito" type="success" isOpen={openSuccess} onClose={() => setOpenSuccess(false)} />
            <Modal title="Error al eliminar" message="el alumno no ha sido eliminado" type="failure" isOpen={openFail} onClose={() => setOpenFail(false)} />
        </>
    )
}

export default DeleteAlu
```

- [ ] **Step 8.6: Rewrite `src/app/AlumnoPages/justify.tsx`**

```tsx
import ReturnButton from "../../components/interactives/buttons/ReturnButton"
import HomeLayout from "../../components/ui/HomeLayout"
import { Table } from "../../components/ui/tables/Table"
import { ALUMNOHEADERS } from "../../utils/Headers"
import { useNavigate } from "react-router-dom"
import { useStudents } from "../../hooks/queries/useStudents"

export default function JustifyAlu() {
    const navigate = useNavigate()
    const { data } = useStudents(0)

    return (
        <HomeLayout title="Incidencias">
            <Table
                header={ALUMNOHEADERS}
                body={data?.data ?? []}
                action="navigate"
                func={(id) => { navigate("/alumno/justify/" + id) }}
            />
            <ReturnButton path="/alumno/" />
        </HomeLayout>
    )
}
```

- [ ] **Step 8.7: Rewrite `src/app/AlumnoPages/justifyone.tsx`**

```tsx
import ReturnButton from "../../components/interactives/buttons/ReturnButton"
import HomeLayout from "../../components/ui/HomeLayout"
import { Table } from "../../components/ui/tables/Table"
import { ALUMNOHEADERS } from "../../utils/Headers"
import { useParams } from "react-router-dom"
import Form from "../../components/interactives/forms/Form"
import TextArea from "../../components/interactives/inputs/textarea"
import Button from "../../components/interactives/buttons/Button"
import { useStudent } from "../../hooks/queries/useStudents"

export default function JustifyOneAlu() {
    const { id } = useParams<{ id: string }>()
    const { data: alumno } = useStudent(id ?? '')

    if (!alumno) {
        return (
            <HomeLayout title="Incidencias">
                <p className="text-center">sin registro</p>
                <ReturnButton path="/alumno/" />
            </HomeLayout>
        )
    }

    return (
        <HomeLayout title="Incidencias">
            <Table header={ALUMNOHEADERS} body={[alumno]} action="list" />
            <Form id="justify" onSubmit={() => {}}>
                <TextArea label="Justificacion" name="justificacion" maxLength={256} change={() => {}} />
                <Button text="justificar" submit={true} action={() => {}} />
            </Form>
            <ReturnButton path="/alumno/" />
        </HomeLayout>
    )
}
```

- [ ] **Step 8.8: Commit**

```bash
git add src/app/AlumnoPages/index.tsx \
        src/app/AlumnoPages/register.tsx \
        src/app/AlumnoPages/update.tsx \
        src/app/AlumnoPages/delete.tsx \
        src/app/AlumnoPages/justify.tsx \
        src/app/AlumnoPages/justifyone.tsx
git commit -m "feat: migrate Alumno pages to TanStack Query"
```

---

## Task 9: Migrate Profesor pages

**Files:**
- Modify: `src/app/ProfesorPages/index.tsx`
- Modify: `src/app/ProfesorPages/register.tsx`
- Modify: `src/app/ProfesorPages/update.tsx`
- Modify: `src/app/ProfesorPages/delete.tsx`

- [ ] **Step 9.1: Read all 4 files**

- [ ] **Step 9.2: Rewrite `src/app/ProfesorPages/index.tsx`**

```tsx
import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { PROFESORHEADERS } from "../../utils/Headers"
import HomeLayout from "../../components/ui/HomeLayout"
import ReturnButton from "../../components/interactives/buttons/ReturnButton"
import Index from "../CrudActions/Index"
import PageBar from "../../components/ui/pageBar"
import { useTeachers } from "../../hooks/queries/useTeachers"
import type { ProfesorModel } from "../../interfaces/Models"

function IndexProf() {
    const [searchParams, setSearchParams] = useSearchParams()
    const page = Number(searchParams.get('page') ?? 0)
    const [current, setCurrent] = useState<ProfesorModel | undefined>()
    const { data, isLoading } = useTeachers(page)

    const onSearch = (id: string) => {
        setCurrent(data?.data.find(t => t.id === id))
    }

    if (isLoading) return (
        <HomeLayout title="Lista de asesores">
            <p className="text-center">Cargando...</p>
        </HomeLayout>
    )

    return (
        <HomeLayout title="Lista de asesores">
            <Index
                headers={PROFESORHEADERS}
                body={data?.data ?? []}
                onSearch={onSearch}
                entity={current}
            />
            <PageBar
                current={page}
                total={data?.total ?? 0}
                onChange={(p: number) => setSearchParams({ page: String(p) })}
            />
            <ReturnButton path="/asesor/" />
        </HomeLayout>
    )
}

export default IndexProf
```

- [ ] **Step 9.3: Rewrite `src/app/ProfesorPages/register.tsx`**

```tsx
import Create from "../CrudActions/Create"
import HomeLayout from "../../components/ui/HomeLayout"
import ReturnButton from "../../components/interactives/buttons/ReturnButton"
import { getFieldsProf } from "../../utils/Fields"
import type { ProfesorModel } from "../../interfaces/Models"
import Modal from "../../components/ui/Modals"
import { useState } from "react"
import { useForm } from "../../hooks/reducers/FormReducer"
import debounce from "../../utils/Debounce"
import { useCreateTeacher } from "../../hooks/mutations/useTeacherMutations"

function CreateProf() {
    const [openSuccess, setOpenSuccess] = useState(false)
    const [openFail, setOpenFail] = useState(false)
    const { state, handleChange, resetForm } = useForm('Profesor')
    const { mutate: create } = useCreateTeacher()

    const submit = debounce(() => {
        const profesor = state.data as ProfesorModel
        profesor.status = "Activo"
        create(profesor, {
            onSuccess: (result) => {
                if (result.success) setOpenSuccess(true)
                else setOpenFail(true)
                resetForm()
            },
            onError: () => { setOpenFail(true); resetForm() }
        })
    }, 500)

    return (
        <>
            <HomeLayout title="Modulo asesor">
                <Create module="asesor" fields={getFieldsProf(state.data as ProfesorModel)} onSubmit={submit} onChange={handleChange} />
                <ReturnButton path="/asesor/" />
            </HomeLayout>
            <Modal title="Asesor registrado" message="el asesor ha sido registrado con exito" type="success" isOpen={openSuccess} onClose={() => setOpenSuccess(false)} />
            <Modal title="Error al registrar" message="el asesor no ha sido registrado" type="failure" isOpen={openFail} onClose={() => setOpenFail(false)} />
        </>
    )
}

export default CreateProf
```

- [ ] **Step 9.4: Rewrite `src/app/ProfesorPages/update.tsx`**

```tsx
import Update from "../CrudActions/Update"
import HomeLayout from "../../components/ui/HomeLayout"
import ReturnButton from "../../components/interactives/buttons/ReturnButton"
import { PROFESORHEADERS } from "../../utils/Headers"
import Modal from "../../components/ui/Modals"
import { useState } from "react"
import type { BaseModel, ProfesorModel } from "../../interfaces/Models"
import PageBar from "../../components/ui/pageBar"
import debounce from "../../utils/Debounce"
import { useSearchParams } from "react-router-dom"
import { useTeachers } from "../../hooks/queries/useTeachers"
import { useUpdateTeacher } from "../../hooks/mutations/useTeacherMutations"

function UpdateProf() {
    const [openSuccess, setOpenSuccess] = useState(false)
    const [openFail, setOpenFail] = useState(false)
    const [current, setCurrent] = useState<ProfesorModel | undefined>()
    const [searchParams, setSearchParams] = useSearchParams()
    const page = Number(searchParams.get('page') ?? 0)
    const { data } = useTeachers(page)
    const { mutate: update } = useUpdateTeacher()

    const onSearch = (id: string) => {
        setCurrent(data?.data.find(t => t.id === id))
    }

    const onUpdate = (updated: BaseModel) => {
        debounce(() => {
            update(updated as ProfesorModel, {
                onSuccess: (result) => {
                    if (result.success) setOpenSuccess(true)
                    else setOpenFail(true)
                },
                onError: () => setOpenFail(true)
            })
        }, 500)()
    }

    return (
        <>
            <HomeLayout title="Modulo asesor">
                <Update
                    module='asesor'
                    entity={current}
                    all={data?.data ?? []}
                    headers={PROFESORHEADERS}
                    onSearch={onSearch}
                    onUpdate={onUpdate}
                />
                <PageBar
                    current={page}
                    total={data?.total ?? 0}
                    onChange={(p: number) => setSearchParams({ page: String(p) })}
                />
                <ReturnButton path="/asesor/" />
            </HomeLayout>
            <Modal title="Asesor actualizado" message="los datos del asesor han sido actualizados" type="success" isOpen={openSuccess} onClose={() => setOpenSuccess(false)} />
            <Modal title="Error al actualizar" message="el asesor no ha sido actualizado" type="failure" isOpen={openFail} onClose={() => setOpenFail(false)} />
        </>
    )
}

export default UpdateProf
```

- [ ] **Step 9.5: Rewrite `src/app/ProfesorPages/delete.tsx`**

```tsx
import Delete from "../CrudActions/Delete"
import HomeLayout from "../../components/ui/HomeLayout"
import ReturnButton from "../../components/interactives/buttons/ReturnButton"
import { PROFESORHEADERS } from "../../utils/Headers"
import Modal from "../../components/ui/Modals"
import { useState } from "react"
import debounce from "../../utils/Debounce"
import PageBar from "../../components/ui/pageBar"
import { useSearchParams } from "react-router-dom"
import { useTeachers } from "../../hooks/queries/useTeachers"
import { useDeleteTeacher } from "../../hooks/mutations/useTeacherMutations"
import type { ProfesorModel } from "../../interfaces/Models"

function DeleteProf() {
    const [openSuccess, setOpenSuccess] = useState(false)
    const [openFail, setOpenFail] = useState(false)
    const [current, setCurrent] = useState<ProfesorModel | undefined>()
    const [searchParams, setSearchParams] = useSearchParams()
    const page = Number(searchParams.get('page') ?? 0)
    const { data } = useTeachers(page)
    const { mutate: remove } = useDeleteTeacher()

    const onSearch = (id: string) => {
        setCurrent(data?.data.find(t => t.id === id))
    }

    const drop = (id: string) => {
        debounce(() => {
            remove(id, {
                onSuccess: (result) => {
                    if (result.success) { setOpenSuccess(true); setCurrent(undefined) }
                    else setOpenFail(true)
                },
                onError: () => setOpenFail(true)
            })
        }, 500)()
    }

    return (
        <>
            <HomeLayout title="Modulo asesor">
                <Delete
                    module="asesor"
                    headers={PROFESORHEADERS}
                    entity={current}
                    all={data?.data ?? []}
                    onSearch={onSearch}
                    onDelete={drop}
                />
                <PageBar
                    current={page}
                    total={data?.total ?? 0}
                    onChange={(p: number) => setSearchParams({ page: String(p) })}
                />
                <ReturnButton path="/asesor/" />
            </HomeLayout>
            <Modal title="Asesor eliminado" message="el asesor ha sido eliminado con exito" type="success" isOpen={openSuccess} onClose={() => setOpenSuccess(false)} />
            <Modal title="Error al eliminar" message="el asesor no ha sido eliminado" type="failure" isOpen={openFail} onClose={() => setOpenFail(false)} />
        </>
    )
}

export default DeleteProf
```

- [ ] **Step 9.6: Commit**

```bash
git add src/app/ProfesorPages/index.tsx \
        src/app/ProfesorPages/register.tsx \
        src/app/ProfesorPages/update.tsx \
        src/app/ProfesorPages/delete.tsx
git commit -m "feat: migrate Profesor pages to TanStack Query"
```

---

## Task 10: Migrate Programa pages

**Files:**
- Modify: `src/app/ProgramaPages/index.tsx`
- Modify: `src/app/ProgramaPages/register.tsx`
- Modify: `src/app/ProgramaPages/update.tsx`
- Modify: `src/app/ProgramaPages/delete.tsx`

- [ ] **Step 10.1: Read all 4 files**

- [ ] **Step 10.2: Rewrite `src/app/ProgramaPages/index.tsx`**

```tsx
import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { PROGRAMAHEADERS } from "../../utils/Headers"
import HomeLayout from "../../components/ui/HomeLayout"
import ReturnButton from "../../components/interactives/buttons/ReturnButton"
import Index from "../CrudActions/Index"
import PageBar from "../../components/ui/pageBar"
import { usePrograms } from "../../hooks/queries/usePrograms"
import type { ProgramaModel } from "../../interfaces/Models"

function IndexProg() {
    const [searchParams, setSearchParams] = useSearchParams()
    const page = Number(searchParams.get('page') ?? 0)
    const [current, setCurrent] = useState<ProgramaModel | undefined>()
    const { data, isLoading } = usePrograms(page)

    const onSearch = (id: string) => {
        setCurrent(data?.data.find(p => p.id === id))
    }

    if (isLoading) return (
        <HomeLayout title="Lista de programas">
            <p className="text-center">Cargando...</p>
        </HomeLayout>
    )

    return (
        <HomeLayout title="Lista de programas">
            <Index
                headers={PROGRAMAHEADERS}
                body={data?.data ?? []}
                onSearch={onSearch}
            />
            <PageBar
                current={page}
                total={data?.total ?? 0}
                onChange={(p: number) => setSearchParams({ page: String(p) })}
            />
            <ReturnButton path="/programa/" />
        </HomeLayout>
    )
}

export default IndexProg
```

- [ ] **Step 10.3: Rewrite `src/app/ProgramaPages/register.tsx`**

```tsx
import Create from "../CrudActions/Create"
import HomeLayout from "../../components/ui/HomeLayout"
import ReturnButton from "../../components/interactives/buttons/ReturnButton"
import { getFieldsProg } from "../../utils/Fields"
import { useForm } from "../../hooks/reducers/FormReducer"
import type { ProgramaModel } from "../../interfaces/Models"
import Modal from "../../components/ui/Modals"
import { useState } from "react"
import debounce from "../../utils/Debounce"
import { useCreateProgram } from "../../hooks/mutations/useProgramMutations"

function CreateProg() {
    const [openSuccess, setOpenSuccess] = useState(false)
    const [openFail, setOpenFail] = useState(false)
    const { state, handleChange, resetForm } = useForm('Programa')
    const { mutate: create } = useCreateProgram()

    const submit = debounce(() => {
        const programa = state.data as ProgramaModel
        programa.status = "Activo"
        create(programa, {
            onSuccess: (result) => {
                if (result.success) setOpenSuccess(true)
                else setOpenFail(true)
                resetForm()
            },
            onError: () => { setOpenFail(true); resetForm() }
        })
    }, 500)

    return (
        <>
            <HomeLayout title="Modulo programa">
                <Create module="programa" fields={getFieldsProg(state.data as ProgramaModel)} onSubmit={submit} onChange={handleChange} />
                <ReturnButton path="/programa/" />
            </HomeLayout>
            <Modal title="Programa creado" message="el programa ha sido creado con exito" type="success" isOpen={openSuccess} onClose={() => setOpenSuccess(false)} />
            <Modal title="Error al crear" message="el programa no ha sido creado" type="failure" isOpen={openFail} onClose={() => setOpenFail(false)} />
        </>
    )
}

export default CreateProg
```

- [ ] **Step 10.4: Rewrite `src/app/ProgramaPages/update.tsx`**

```tsx
import Update from "../CrudActions/Update"
import HomeLayout from "../../components/ui/HomeLayout"
import ReturnButton from "../../components/interactives/buttons/ReturnButton"
import { PROGRAMAHEADERS } from "../../utils/Headers"
import Modal from "../../components/ui/Modals"
import { useState } from "react"
import type { BaseModel, ProgramaModel } from "../../interfaces/Models"
import PageBar from "../../components/ui/pageBar"
import debounce from "../../utils/Debounce"
import { useSearchParams } from "react-router-dom"
import { usePrograms } from "../../hooks/queries/usePrograms"
import { useUpdateProgram } from "../../hooks/mutations/useProgramMutations"

function UpdateProg() {
    const [openSuccess, setOpenSuccess] = useState(false)
    const [openFail, setOpenFail] = useState(false)
    const [current, setCurrent] = useState<ProgramaModel | undefined>()
    const [searchParams, setSearchParams] = useSearchParams()
    const page = Number(searchParams.get('page') ?? 0)
    const { data } = usePrograms(page)
    const { mutate: update } = useUpdateProgram()

    const onSearch = (id: string) => {
        setCurrent(data?.data.find(p => p.id === id))
    }

    const onUpdate = (updated: BaseModel) => {
        debounce(() => {
            if (updated.status === "Permiso") updated.status = "Inactivo"
            update(updated as ProgramaModel, {
                onSuccess: (result) => {
                    if (result.success) setOpenSuccess(true)
                    else setOpenFail(true)
                },
                onError: () => setOpenFail(true)
            })
        }, 500)()
    }

    return (
        <>
            <HomeLayout title="Modulo programa">
                <Update
                    module='programa'
                    entity={current}
                    all={data?.data ?? []}
                    headers={PROGRAMAHEADERS}
                    onSearch={onSearch}
                    onUpdate={onUpdate}
                />
                <PageBar
                    current={page}
                    total={data?.total ?? 0}
                    onChange={(p: number) => setSearchParams({ page: String(p) })}
                />
                <ReturnButton path="/programa/" />
            </HomeLayout>
            <Modal title="Programa actualizado" message="los datos del programa han sido actualizados" type="success" isOpen={openSuccess} onClose={() => setOpenSuccess(false)} />
            <Modal title="Error al actualizar" message="el programa no ha sido actualizado" type="failure" isOpen={openFail} onClose={() => setOpenFail(false)} />
        </>
    )
}

export default UpdateProg
```

- [ ] **Step 10.5: Rewrite `src/app/ProgramaPages/delete.tsx`**

```tsx
import Delete from "../CrudActions/Delete"
import HomeLayout from "../../components/ui/HomeLayout"
import ReturnButton from "../../components/interactives/buttons/ReturnButton"
import { PROGRAMAHEADERS } from "../../utils/Headers"
import Modal from "../../components/ui/Modals"
import { useState } from "react"
import PageBar from "../../components/ui/pageBar"
import debounce from "../../utils/Debounce"
import { useSearchParams } from "react-router-dom"
import { usePrograms } from "../../hooks/queries/usePrograms"
import { useDeleteProgram } from "../../hooks/mutations/useProgramMutations"
import type { ProgramaModel } from "../../interfaces/Models"

function DeleteProg() {
    const [openSuccess, setOpenSuccess] = useState(false)
    const [openFail, setOpenFail] = useState(false)
    const [current, setCurrent] = useState<ProgramaModel | undefined>()
    const [searchParams, setSearchParams] = useSearchParams()
    const page = Number(searchParams.get('page') ?? 0)
    const { data } = usePrograms(page)
    const { mutate: remove } = useDeleteProgram()

    const onSearch = (id: string) => {
        setCurrent(data?.data.find(p => p.id === id))
    }

    const drop = (id: string) => {
        debounce(() => {
            remove(id, {
                onSuccess: (result) => {
                    if (result.success) { setOpenSuccess(true); setCurrent(undefined) }
                    else setOpenFail(true)
                },
                onError: () => setOpenFail(true)
            })
        }, 500)()
    }

    return (
        <>
            <HomeLayout title="Modulo programa">
                <Delete
                    module="programa"
                    headers={PROGRAMAHEADERS}
                    entity={current}
                    all={data?.data ?? []}
                    onSearch={onSearch}
                    onDelete={drop}
                />
                <PageBar
                    current={page}
                    total={data?.total ?? 0}
                    onChange={(p: number) => setSearchParams({ page: String(p) })}
                />
                <ReturnButton path="/programa/" />
            </HomeLayout>
            <Modal title="Programa eliminado" message="el programa ha sido eliminado con exito" type="success" isOpen={openSuccess} onClose={() => setOpenSuccess(false)} />
            <Modal title="Error al eliminar" message="el programa no ha sido eliminado" type="failure" isOpen={openFail} onClose={() => setOpenFail(false)} />
        </>
    )
}

export default DeleteProg
```

- [ ] **Step 10.6: Commit**

```bash
git add src/app/ProgramaPages/index.tsx \
        src/app/ProgramaPages/register.tsx \
        src/app/ProgramaPages/update.tsx \
        src/app/ProgramaPages/delete.tsx
git commit -m "feat: migrate Programa pages to TanStack Query"
```

---

## Task 11: Delete obsolete files

**Files to delete (12 total):**

- [ ] **Step 11.1: Delete all obsolete files**

```bash
cd /home/uhernand/checadordepi-frontend
git rm src/hooks/context/AuthContext.tsx \
       src/hooks/context/StudentContext.tsx \
       src/hooks/context/TeacherContext.tsx \
       src/hooks/context/ProgramContext.tsx \
       src/hooks/providers/auth.tsx \
       src/hooks/providers/students.tsx \
       src/hooks/providers/teachers.tsx \
       src/hooks/providers/programs.tsx \
       src/hooks/reducers/entities.ts \
       src/components/wrappers/StudentWrapper.tsx \
       src/components/wrappers/TeacherWrapper.tsx \
       src/components/wrappers/ProgramWrapper.tsx
```

- [ ] **Step 11.2: Commit**

```bash
git commit -m "chore: delete obsolete contexts, providers, entity wrappers and reducer"
```

---

## Task 12: TypeScript compile check

- [ ] **Step 12.1: Run TypeScript compiler**

```bash
cd /home/uhernand/checadordepi-frontend
npx tsc --noEmit 2>&1
```

Expected: zero errors. If errors appear:
- `Cannot find module '../../hooks/context/...'` → a page still imports old context. Find the file, update the import.
- `Property 'expiration' does not exist on type 'TokenConfig'` → `httpModels.ts` still has old field. Check `src/interfaces/httpModels.ts`.
- `useStudents is not a function` → import path wrong. Check the import in the failing file.

- [ ] **Step 12.2: Fix any type errors and commit**

```bash
git add -A
git commit -m "fix: resolve TypeScript errors after TanStack Query migration"
```

- [ ] **Step 12.3: Create and push feature branch**

```bash
cd /home/uhernand/checadordepi-frontend
git checkout -b feature/tanstack-query-migration
git push -u origin feature/tanstack-query-migration
git checkout main
git reset --hard origin/main
```

Expected:
- `feature/tanstack-query-migration` pushed to GitHub
- `main` local = `origin/main` (clean, no migration commits)
