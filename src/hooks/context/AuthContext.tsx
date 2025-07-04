import { createContext } from "react";

type AuthContextType = {
    valid: boolean,
    validate: (v:boolean) => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);