import { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import type { TokenConfig } from "../../interfaces/httpModels";
import { useNavigate } from "react-router-dom";

interface AuthProviderProps {
    children: React.ReactNode
}

export function useAuth() {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("Requiere AuthProvider");
    }
    return context;
}

export function AuthProvider({ children }:AuthProviderProps){
    //objeto jwt
    const [jwt, setJwt] = useState<TokenConfig>({token: "", expiration: 0});
    //contador de tiempo
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    //hook de navegador
    const navigate = useNavigate();

    useEffect(() => {
        //obtener el respaldo
        const backup = localStorage.getItem("access-token");

        //si existe, guardarlo en state
        if(backup){
            setJwt(JSON.parse(backup));
        }
    },[]);

    //guardar la informacion del token
    const store = (tk:string, exp: number) => {
        //crear nuevo objeto
        const newJWT = {token: tk, expiration: exp} as TokenConfig;
        //guardar en localstorage
        localStorage.clear();
        localStorage.setItem("access-token",JSON.stringify(newJWT));
        //guardar en estado
        setJwt(newJWT);
        //fijar el temporizador
        if(timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(()=>{
            //mostrar alerta
            alert("la sesion esta por cerrarse");
            //ejecutar limpieza
            clear();
            //redirigir
            navigate("/");
        },newJWT.expiration);
    }

    //limpiar el estado
    const clear = () => {
        //limpiar el localstorage
        localStorage.clear();
        setJwt({token: "", expiration: 0});
        if(timeoutRef.current) clearTimeout(timeoutRef.current);
    }

    //retorno del provider
    return(
        <AuthContext.Provider value={{token: jwt.token, store, clear}}>
            {children}
        </AuthContext.Provider>
    );
}