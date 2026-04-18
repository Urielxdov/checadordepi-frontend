export interface BaseModel {
    id: string
    nombre: string
    status: string
}

export interface AlumnoModel extends BaseModel{
    //atributos propios
    apellidos: string
    telefono: string
    calle: string
    colonia: string
    correo: string
    profesor: string
    programa: string
    foto?: File
}

export interface ProfesorModel extends BaseModel{
    //atributos propios
    apellidos: string
    telefono: string
    correo: string
    grado: string
    nombre_grado: string
}

export interface ProgramaModel extends BaseModel{
    //atributos propios
    registro: string
}

export interface LoginModel {
    user: string
    password?: string
    rol?: string
}