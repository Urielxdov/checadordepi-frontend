import type { PagedData, ProfesorAPI } from "../interfaces/httpConfig";
import type { ProfesorConfig } from "../interfaces/ModelsInterfaces";

//endpoint del api
const api_url = 'http://localhost:8080/profesor'

//pedir profesores
export async function getTeachersA():Promise<PagedData<ProfesorConfig>>{
    //peticion con fetch
    const response = await fetch(api_url+'/get/all');

    //verificar el exito
    if(!response.ok){
        //mostrar error
        throw new Error(response.status.toString());
    }

    //obtener data
    const data = await response.json();
    return {data: data.data.map((p:ProfesorAPI)=> jsonMapper(p)), page: data.page, total: data.total} as PagedData<ProfesorConfig>
}

//pedir profesores activos
export async function getActiveTeachers():Promise<PagedData<ProfesorConfig>>{
    //peticion con fetch
    const response = await fetch(api_url+'/get/actives');

    //verificar el exito
    if(!response.ok){
        //mostrar error
        throw new Error("Error("+response.status+"): "+response.statusText);
    }

    return await response.json();
}

export async function createTeacher(prof:ProfesorConfig):Promise<boolean>{
    //peticion con fetch
    const response = await fetch(api_url+'/create',{
        method: "POST",
        mode: "cors",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(modelRemaper(prof))
    })

    console.log(prof)

    //revisar si fue exitosa
    if(!response.ok){
        //mostrar error
        throw new Error("Error("+response.status+"): "+response.statusText);
    }
    //avisar del exito
    return true;
}

export async function updateTeacherA(updated: ProfesorConfig):Promise<boolean>{
    //peticion con fetch
    const response = await fetch(api_url+'/update',{
        method: "PUT",
        mode: "cors",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(modelRemaper(updated))
    })

    //revisar si fue exitosa
    if(!response.ok){
        //mostrar error
        throw new Error("Error("+response.status+"): "+response.statusText);
    }

    //avisar de exito
    return true;
}

export async function deleteTeacherA(id: string):Promise<boolean>{
    //peticion con fetch
    const response = await fetch(api_url+'/delete/'+id,{
        method:"DELETE",
        mode:"cors"
    });

    //revisar si hubo exito
    if(!response.ok){
        //mostrar error
        throw new Error(response.status.toString());
    }

    return true;
}

function modelRemaper(prof:ProfesorConfig):ProfesorAPI{
    return {
        "clave_profesor": prof.id as string,
        "nombre_profesor": prof.nombre,
        "apellido_profesor": prof.apellidos,
        "telefono_profesor":prof.telefono,
        "correo_profesor":prof.correo,
        "grado_maximo":prof.grado,
        "nombre_grado_maximo":prof.nombre_grado,
        "estatus_profesor":prof.status
    } as ProfesorAPI
}

function jsonMapper(prof:ProfesorAPI):ProfesorConfig{
    return {
        id: prof.clave_profesor,
        nombre: prof.nombre_profesor,
        apellidos: prof.apellido_profesor,
        telefono: prof.telefono_profesor,
        correo: prof.correo_profesor,
        grado: prof.grado_maximo,
        nombre_grado: prof.nombre_grado_maximo,
        status: prof.estatus_profesor
    } as ProfesorConfig
}