import { useEffect, useState, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import type { TokenConfig } from "../../interfaces/httpModels";
import { useNavigate } from "react-router-dom";

//propiedades del provider
interface AuthProviderProps {
    children: React.ReactNode
}

//provider de autenticacion
export default function AuthProvider({ children }:AuthProviderProps){
    //objeto jwt
    const [jwt, setJwt] = useState<TokenConfig>({token: "", expiration: 0, role: ""});
    //contador de tiempo
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    //hook de navegador
    const navigate = useNavigate();

    //por si la pagina se recarga, recuperar del ls
    useEffect(() => {
        //obtener el respaldo
        const backup = localStorage.getItem("access-token");

        //si existe, guardarlo en state
        if(backup){
            setJwt(JSON.parse(backup));
        }
    },[]);

    //guardar la informacion del token
    const store = (tk:string, exp: number, role: string) => {
        //crear nuevo objeto
        const newJWT = {token: tk, expiration: exp, role} as TokenConfig;
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
        setJwt({token: "", expiration: 0, role: ""});
        if(timeoutRef.current) clearTimeout(timeoutRef.current);
    }

    //retorno del provider
    return(
        <AuthContext.Provider value={{token: jwt.token, role: jwt.role, store, clear}}>
            {children}
        </AuthContext.Provider>
    );
}
