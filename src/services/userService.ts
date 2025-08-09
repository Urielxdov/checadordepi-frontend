import type { OperationResponse, LoginAPI } from "../interfaces/httpConfig";
import type { LoginConfig } from "../interfaces/ModelsInterfaces";

//endpoint del api
const api_url = 'http://localhost:8080/auth'

//validar acceso y obtener el token
export async function validateAccess(login: LoginConfig):Promise<string|null>{
    //peticion con fetch
    const response = await fetch(api_url+"/login",{
        method: "POST",
        mode: "cors",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(modelRemapper(login))
    });

    //verificar exito
    if(!response.ok){
        throw new Error("Error al validar acceso!!!");
    }

    //verificar el exito en autenticacion
    const result = await response.json() as OperationResponse<LoginAPI>;
    if(!result.success){ return null }

    //retorno de token
    return response.headers.get("access-token") as string;
}

function modelRemapper(l:LoginConfig):LoginAPI{
    return {
        username: l.user,
        password: l.password
    } as LoginAPI;
}

function jsonMapper(l:LoginAPI):LoginConfig{
    return {
        user: l.username,
        rol: l.role
    } as LoginConfig
}