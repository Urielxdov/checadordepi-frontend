import type { BaseModel } from "./ModelsInterfaces";

export interface PagedData<T extends BaseModel>{
    data: T[]
    page: number
    total: number
}

export interface ValidatedAccess {
    token: string
}

// modelos de backend
export interface ProfesorAPI {
    clave_profesor: string
    nombre_profesor: string,
    apellido_profesor: string,
    telefono_profesor: string,
    correo_profesor: string,
    grado_maximo: string,
    nombre_grado_maximo: string,
    estatus_profesor: string
}