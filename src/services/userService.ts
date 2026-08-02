import type { OperationResponse, LoginAPI } from "../interfaces/httpModels";
import type { LoginModel } from "../interfaces/Models";
import { USERURL } from "../utils/APIurls";
import { apiError } from "./apiErrors";

interface AuthResult {
    token: string
    role: string
}

//validar acceso y obtener el token
export async function validateAccess(login: LoginModel):Promise<AuthResult|null>{
    //peticion con fetch
    const response = await fetch(USERURL+"/login",{
        method: "POST",
        mode: "cors",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(modelRemapper(login))
    });

    //verificar exito
    if(!response.ok){
        throw await apiError(response, "Error al validar acceso");
    }

    //verificar el exito en autenticacion
    const result = await response.json() as OperationResponse<LoginAPI>;
    if(!result.success){ return null }

    const token = response.headers.get("access-token");
    if(!token || !result.data?.role){ return null; }

    return { token, role: result.data.role };
}

function modelRemapper(l:LoginModel):LoginAPI{
    return {
        username: l.user,
        password: l.password
    } as LoginAPI;
}
