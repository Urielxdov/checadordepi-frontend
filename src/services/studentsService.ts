import type { OperationResponse, PagedData } from "../interfaces/httpConfig"
import type { AlumnoConfig } from "../interfaces/ModelsInterfaces"
import type { AlumnoAPI } from "../interfaces/httpConfig";

const apiUrl = 'http://localhost:8080/alumno'

export async function getStudentsA(page:number, token: string):Promise<PagedData<AlumnoConfig>>{
    //peticion con fetch
    const response = await fetch(apiUrl+'/get/all?page='+page,{
        method:"GET",
        mode:"cors",
        headers: {"access-token": token}
    });

    //verificar exito
    if(!response.ok){
        throw new Error("error al obtener alumnos!!!");
    }

    //retorno de datos
    const data = await response.json()
    return { data: data.data.map((a:AlumnoAPI) => jsonMapper(a)), page: data.page, total: data.total } as PagedData<AlumnoConfig>
}

export async function getActiveStudents(page:number, token: string):Promise<PagedData<AlumnoConfig>>{
    //peticion con fetch
    const response = await fetch(apiUrl+'/get/actives?page='+page,{
        method:"GET",
        mode:"cors",
        headers: {"access-token": token}
    });

    //verificar exito
    if(!response.ok){
        throw new Error("error al obtener alumnos!!!");
    }

    //retorno de datos
    const data = await response.json()
    return { data: data.data.map((a:AlumnoAPI) => jsonMapper(a)), page: data.page, total: data.total } as PagedData<AlumnoConfig>
}

export async function createStudent(a:AlumnoConfig, foto:File, token: string):Promise<OperationResponse<AlumnoConfig>>{
    //preparar form data
    const data = new FormData();
    //pasarlo a blob para incluir el content-type
    data.append("student", new Blob([JSON.stringify(modelRemaper(a))],{type:'application/json'}));
    data.append("image", foto);
  
    //peticion con fetch
    const response = await fetch(apiUrl+'/create',{
        method: 'POST',
        mode: 'cors',
        headers: {'access-token':token},
        body: data
    });

    //verificar exito
    if(!response.ok){
      throw new Error("error al crear alumno");
    }

    //retorno de respuesta
    const result = await response.json() as OperationResponse<AlumnoAPI>;
    return {...result, data: jsonMapper(result.data as AlumnoAPI)} as OperationResponse<AlumnoConfig>;
}

export async function deleteStudentA(id: string, token: string):Promise<OperationResponse<AlumnoAPI>>{
    //peticion al api
    const response = await fetch(apiUrl+'/delete/'+id,{
      method: "DELETE",
      mode:"cors",
      headers: {"access-token":token}
    });
    //validar exito
    if(!response.ok){
      throw new Error("error al eliminar alumnos");
    }
    //retorno de datos
    return await response.json();
}

export async function updateStudentA(a:AlumnoConfig, foto:File | undefined, token: string):Promise<OperationResponse<AlumnoConfig>>{
    //preparar formdata
    const data = new FormData();
    data.append("student",new Blob([JSON.stringify(modelRemaper(a))],{type:'application/json'}));
    if(foto) data.append("image",foto);
    //peticion al api
    const response = await fetch(apiUrl+'/update',{
      method: "PATCH",
      mode: "cors",
      headers:{"access-token":token},
      body: data
    });
    //verificar exito
    if(!response.ok){
      throw new Error("error al actualizar alumno");
    }
    //retorno de datos
    const result = await response.json() as OperationResponse<AlumnoAPI>;
    return {...result, data: jsonMapper(result.data as AlumnoAPI)} as OperationResponse<AlumnoConfig>;
}

//remappers
function modelRemaper(a: AlumnoConfig):AlumnoAPI{
    return {
      numero_control: a.id,
      nombre_alumno: a.nombre,
      apellido_alumno: a.apellidos,
      telefono_alumno: a.telefono,
      calle_alumno: a.calle,
      colonia_alumno: a.colonia,
      correo_alumno: a.correo,
      clave_profesor: a.profesor,
      clave_programa: a.programa,
      estatus_alumno: a.status
    } as AlumnoAPI;
}

function jsonMapper(a: AlumnoAPI):AlumnoConfig{
    return {
      id: a.numero_control,
      nombre: a.nombre_alumno,
      apellidos: a.apellido_alumno,
      telefono: a.telefono_alumno,
      calle: a.calle_alumno,
      colonia: a.colonia_alumno,
      correo: a.correo_alumno,
      profesor: a.clave_profesor,
      programa: a.clave_programa,
      status: a.estatus_alumno,
    } as AlumnoConfig;
}