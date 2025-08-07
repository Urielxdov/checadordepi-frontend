import type { SelectItem, OperationResponse, PagedData, ProgramaAPI } from "../interfaces/httpConfig";
import type { ProgramaConfig } from "../interfaces/ModelsInterfaces";

//endpoint del api
const api_url = 'http://localhost:8080/programa_estudios'

//pedir profesores
export async function getPrograms(page:number):Promise<PagedData<ProgramaConfig>>{
    //peticion con fetch
    const response = await fetch(api_url+'/get/all?page='+page);

    //verificar el exito
    if(!response.ok){
        //mostrar error
        throw new Error(response.status.toString());
    }

    //obtener data
    const data = await response.json();
    return {data: data.data.map((p:ProgramaAPI)=> jsonMapper(p)), page: data.page, total: data.total} as PagedData<ProgramaConfig>
}

//pedir profesores activos
export async function getActivePrograms(page:number):Promise<PagedData<ProgramaConfig>>{
    //peticion con fetch
    const response = await fetch(api_url+'/get/actives?page='+page);

    //verificar el exito
    if(!response.ok){
        //mostrar error
        throw new Error(response.status.toString());
    }

    //obtener data
    const data = await response.json();
    return {data: data.data.map((p:ProgramaAPI)=> jsonMapper(p)), page: data.page, total: data.total} as PagedData<ProgramaConfig>
}

export async function getProgramSelect():Promise<Array<SelectItem>>{
    //peticion con fetch
    const response = await fetch(api_url+"/get/all/select");

    //verificar el exito 
    if(!response.ok){
        //mostrat el error
        throw new Error(response.status.toString());
    }

    return await response.json();
}

export async function createProgram(prof:ProgramaConfig):Promise<OperationResponse<ProgramaAPI>>{
    //peticion con fetch
    const response = await fetch(api_url+'/create',{
        method: "POST",
        mode: "cors",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(modelRemapper(prof))
    })

    //revisar si fue exitosa
    if(!response.ok){
        //mostrar error
        throw new Error(response.status.toString());
    }
    //avisar del exito
    return await response.json();
}

export async function updateProgramA(updated: ProgramaConfig):Promise<OperationResponse<ProgramaAPI>>{
    //peticion con fetch
    const response = await fetch(api_url+'/update',{
        method: "PUT",
        mode: "cors",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(modelRemapper(updated))
    })

    //revisar si fue exitosa
    if(!response.ok){
        //mostrar error
        throw new Error(response.status.toString());
    }

    //avisar de exito
    return await response.json();
}

export async function deleteProgramA(id: string):Promise<OperationResponse<ProgramaAPI>>{
    //peticion con fetch
    const response = await fetch(api_url+'/delete/'+id,{
        method:"DELETE",
        mode:"cors",
    });

    //revisar si hubo exito
    if(!response.ok){
        //mostrar error
        throw new Error(response.status.toString());
    }

    return await response.json();
}

function modelRemapper(prog:ProgramaConfig):ProgramaAPI{
    return {
        clave_programa: prog.id,
        nombre_programa: prog.nombre,
        registro_conahcyt: prog.registro,
        estatus_programa: prog.status
    } as ProgramaAPI
}

function jsonMapper(prog:ProgramaAPI):ProgramaConfig{
    return {
        id: prog.clave_programa,
        nombre: prog.nombre_programa,
        registro: prog.registro_conahcyt,
        status: prog.estatus_programa
    } as ProgramaConfig
}