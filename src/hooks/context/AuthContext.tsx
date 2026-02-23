import { createContext } from "react";

type AuthContextType = {
    token: string
    store: (token: string, expiration: number) => void
    clear: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);