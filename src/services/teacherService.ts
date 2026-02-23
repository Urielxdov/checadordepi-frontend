import type { OperationResponse, PagedData, ProfesorAPI, SelectItem } from "../interfaces/httpConfig";
import type { ProfesorConfig } from "../interfaces/ModelsInterfaces";
import { TEACHERURL } from "../utils/APIurls";

//pedir profesores
export async function getTeachersA(page:number, token:string):Promise<PagedData<ProfesorConfig>>{
    //peticion con fetch
    const response = await fetch(TEACHERURL+'/get/all?page='+page,{
        method:"GET",
        mode:"cors",
        headers: {"access-token": token}
    });

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
export async function getActiveTeachers(page:number, token:string):Promise<PagedData<ProfesorConfig>>{
    //peticion con fetch
    const response = await fetch(TEACHERURL+'/get/actives?page='+page,{
        method:"GET",
        mode:"cors",
        headers: {"access-token": token}
    });

    //verificar el exito
    if(!response.ok){
        //mostrar error
        throw new Error("Error("+response.status+"): "+response.statusText);
    }

    const data = await response.json();

    return {data: data.data.map((p:ProfesorAPI) => jsonMapper(p)), page: data.page, total: data.total};
}

export async function getTeacherSelect(token:string):Promise<Array<SelectItem>>{
    //peticion con fetch
    const response = await fetch(TEACHERURL+"/get/all/select",{
        method:"GET",
        mode:"cors",
        headers: {"access-token": token}
    });

    //verificar el exito 
    if(!response.ok){
        //mostrat el error
        throw new Error(response.status.toString());
    }

    return await response.json();
}

export async function createTeacher(prof:ProfesorConfig, token:string):Promise<OperationResponse<ProfesorAPI>>{
    //peticion con fetch
    const response = await fetch(TEACHERURL+'/create',{
        method: "POST",
        mode: "cors",
        headers: {'Content-Type':'application/json', "access-token":token},
        body: JSON.stringify(modelRemaper(prof))
    })

    //revisar si fue exitosa
    if(!response.ok){
        //mostrar error
        throw new Error("Error("+response.status+"): "+response.statusText);
    }
    //avisar del exito
    return await response.json();
}

export async function updateTeacherA(updated: ProfesorConfig, token:string):Promise<OperationResponse<ProfesorAPI>>{
    //peticion con fetch
    const response = await fetch(TEACHERURL+'/update',{
        method: "PUT",
        mode: "cors",
        headers: {'Content-Type':'application/json',"access-token":token},
        body: JSON.stringify(modelRemaper(updated))
    })

    //revisar si fue exitosa
    if(!response.ok){
        //mostrar error
        throw new Error("Error("+response.status+"): "+response.statusText);
    }

    //avisar de exito
    return await response.json();
}

export async function deleteTeacherA(id: string, token:string):Promise<OperationResponse<ProfesorAPI>>{
    //peticion con fetch
    const response = await fetch(TEACHERURL+'/delete/'+id,{
        method:"DELETE",
        mode:"cors",
        headers:{"access-token":token}
    });

    //revisar si hubo exito
    if(!response.ok){
        //mostrar error
        throw new Error(response.status.toString());
    }

    return await response.json();
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