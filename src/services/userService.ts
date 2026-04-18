import type { OperationResponse, LoginAPI } from "../interfaces/httpModels";
import type { LoginModel } from "../interfaces/Models";
import { USERURL } from "../utils/APIurls";

//validar acceso y obtener el token
export async function validateAccess(login: LoginModel):Promise<string|null>{
    //peticion con fetch
    const response = await fetch(USERURL+"/login",{
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

function modelRemapper(l:LoginModel):LoginAPI{
    return {
        username: l.user,
        password: l.password
    } as LoginAPI;
}