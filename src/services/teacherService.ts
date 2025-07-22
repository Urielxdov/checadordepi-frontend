import type { PagedData } from "../interfaces/httpConfig";
import type { ProfesorConfig } from "../interfaces/ModelsInterfaces";

//endpoint del api
const api_url = 'http://localhost:8080/profesor'

//pedir profesores
export async function getTeachers():Promise<PagedData<ProfesorConfig>>{
    //peticion con fetch
    const response = await fetch(api_url+'/get/all');

    //verificar el exito
    if(!response.ok){
        throw new Error("Fallo al obtener profesores!!!");
    }

    return await response.json();
}

//pedir profesores activos
export async function getActiveTeachers():Promise<PagedData<ProfesorConfig>>{
    //peticion con fetch
    const response = await fetch(api_url+'/get/actives');

    //verificar el exito
    if(!response.ok){
        throw new Error("Fallo al obtener profesores!!!");
    }

    return await response.json();
}

export async function createTeacher(prof:ProfesorConfig):Promise<boolean>{
    //peticion con fetch
    const response = await fetch(api_url+'/create',{
        method: "POST",
        mode: "cors",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(prof)
    })

    //revisar si fue exitosa
    if(!response.ok){
        throw new Error("Fallo al crear profesor!!!");
    }
    //avisar del exito
    return true;
}

export async function updateTeacher(updated: ProfesorConfig):Promise<boolean>{
    //peticion con fetch
    const response = await fetch(api_url+'/update',{
        method: "PUT",
        mode: "cors",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(updated)
    })

    //revisar si fue exitosa
    if(!response.ok){
        throw new Error("Fallo al actualizar profesor");
    }

    //avisar de exito
    return true;
}

export async function deleteTeacher(id: string):Promise<boolean>{
    //peticion con fetch
    const response = await fetch(api_url+'/delete/'+id,{
        method:"DELETE",
        mode:"cors",
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({'clave': id})
    });

    //revisar si hubo exito
    if(!response.ok){
        throw new Error("Fallo al eliminar profesor");
    }

    return true;
}