import { create } from 'zustand'

const TOKEN_KEY = 'access-token'

interface AuthState {
    token: string
    expiresAt: number
    role: string
    store: (tk: string, durationMs: number, role: string) => void
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

function readLocalStorage(): { token: string; expiresAt: number; role: string } | null {
    try {
        const raw = localStorage.getItem(TOKEN_KEY)
        if (!raw) return null
        const parsed = JSON.parse(raw) as { token: string; expiresAt: number; role?: string }
        if (parsed.expiresAt > Date.now()) {
            return { token: parsed.token, expiresAt: parsed.expiresAt, role: parsed.role ?? '' }
        }
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
        role: saved?.role ?? '',

        store: (tk: string, durationMs: number, role: string) => {
            const expiresAt = Date.now() + durationMs
            localStorage.removeItem(TOKEN_KEY)
            localStorage.setItem(TOKEN_KEY, JSON.stringify({ token: tk, expiresAt, role }))
            set({ token: tk, expiresAt, role })
            scheduleExpiry(expiresAt, () => get().clear())
        },

        clear: () => {
            localStorage.removeItem(TOKEN_KEY)
            if (expiryTimer) clearTimeout(expiryTimer)
            expiryTimer = null
            set({ token: '', expiresAt: 0, role: '' })
        },
    }
})
