export interface AlumnoConfig {
    id: string
    nombre: string
    apellidos: string
    telefono: string
    calle: string
    colonia: string
    correo: string
    status: string
}

export interface ProfesorConfig {
    id: string
    nombre: string
    apellidos: string
    telefono: string
    correo: string
    grado: string
    nombre_grado: string
    status: string
}

export interface ProgramaConfig {
    id: number
    nombre: string
    registro: string
    status: string
}

export interface LoginConfig {
    user: string
    password: string
}