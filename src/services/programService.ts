import type { PagedData } from "../interfaces/httpConfig";
import type { ProgramaConfig } from "../interfaces/ModelsInterfaces";

//endpoint del api
const api_url = 'http://localhost:8080/programa_estudios'

//pedir profesores
export async function getPrograms():Promise<PagedData<ProgramaConfig>>{
    //peticion con fetch
    const response = await fetch(api_url+'/get/all');

    //verificar el exito
    if(!response.ok){
        throw new Error("Fallo al obtener programas!!!");
    }

    return await response.json();
}

//pedir profesores activos
export async function getActivePrograms():Promise<PagedData<ProgramaConfig>>{
    //peticion con fetch
    const response = await fetch(api_url+'/get/actives');

    //verificar el exito
    if(!response.ok){
        throw new Error("Fallo al obtener programas!!!");
    }

    return await response.json();
}

export async function createProgram(prof:ProgramaConfig):Promise<boolean>{
    //peticion con fetch
    const response = await fetch(api_url+'/create',{
        method: "POST",
        mode: "cors",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(prof)
    })

    //revisar si fue exitosa
    if(!response.ok){
        throw new Error("Fallo al crear programa!!!");
    }
    //avisar del exito
    return true;
}

export async function updateProgram(updated: ProgramaConfig):Promise<boolean>{
    //peticion con fetch
    const response = await fetch(api_url+'/update',{
        method: "PUT",
        mode: "cors",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(updated)
    })

    //revisar si fue exitosa
    if(!response.ok){
        throw new Error("Fallo al actualizar programa");
    }

    //avisar de exito
    return true;
}

export async function deleteProgram(id: string):Promise<boolean>{
    //peticion con fetch
    const response = await fetch(api_url+'/delete/'+id,{
        method:"DELETE",
        mode:"cors",
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({'clave': id})
    });

    //revisar si hubo exito
    if(!response.ok){
        throw new Error("Fallo al eliminar programa");
    }

    return true;
}