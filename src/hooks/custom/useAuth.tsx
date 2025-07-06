import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

type PropsHook = {
    children: React.ReactNode
}

export function getAuthContext(){
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("getAuthContext requiere el uso de Provider");
    }
    return context;
}

export function AuthProvider({ children }:PropsHook){
    const [auth, setAuth] = useState(false);

    return (
        <AuthContext.Provider value={{valid: auth, validate: setAuth}}>
            {children}
        </AuthContext.Provider>
    );
}
