import { createContext, useContext } from "react";

//propiedades del contexto
interface AuthContextType {
    token: string
    role: string
    store: (token: string, expiration: number, role: string) => void
    clear: () => void
}

//contexto
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

//consumer
export function useAuth() {
    //consumir el contexto
    const context = useContext(AuthContext);
    //verificar el contexto
    if(!context){
        throw new Error("Requiere AuthProvider");
    }
    //retornar el contexto
    return context;
}
