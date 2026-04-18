import type { BaseModel } from "./Models";

export interface PagedData<T extends BaseModel>{
    data: T[]
    page: number
    total: number
}

export interface OperationResponse<P>{
    success: boolean
    exception: boolean
    message: string
    code_status: number
    data?: P
    fields?: Object
}

export interface SelectItem {
    key: string
    fullName?: string
    name?: string
}

// modelos de backend
export interface ProfesorAPI {
    clave_profesor: string,
    nombre_profesor: string,
    apellido_profesor: string,
    telefono_profesor: string,
    correo_profesor: string,
    grado_maximo: string,
    nombre_grado_maximo: string,
    estatus_profesor: string
}

export interface ProgramaAPI {
    clave_programa: string,
    nombre_programa: string,
    registro_conahcyt: string,
    estatus_programa: string
}

export interface AlumnoAPI {
    numero_control: string,
    nombre_alumno: string,
    apellido_alumno: string,
    telefono_alumno: string,
    calle_alumno: string,
    colonia_alumno: string,
    correo_alumno: string,
    estatus_alumno: string,
    clave_profesor: string,
    clave_programa: string,
    foto?: string,
    vector?: string
}

export interface LoginAPI {
    username: string
    password?: string
    role?: string
}

export interface TokenConfig{
    token: string,
    expiration: number
}