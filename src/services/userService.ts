import type { LoginConfig } from "../interfaces/ModelsInterfaces";
import type { ValidatedAccess } from "../interfaces/httpConfig";

//endpoint del api
const api_url = 'http://localhost:8080/login'

//validar acceso y obtener el token
export async function validateAccess(login: LoginConfig):Promise<ValidatedAccess>{
    //peticion con fetch
    const response = await fetch(api_url+"/validate",{
        method: "POST",
        mode: "cors",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(login)
    });

    //verificar exito
    if(!response.ok){
        throw new Error("Error al validar acceso!!!");
    }

    //retorno de token
    return await response.json()
}