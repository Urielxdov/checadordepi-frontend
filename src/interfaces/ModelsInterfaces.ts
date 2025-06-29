export interface AlumnoConfig {
    noControl: string
    nombre: string
    apellidos: string
    telefono: string
    calle: string
    colonia: string
    correo: string
    status: string
}

export interface ProfesorConfig {
    clave: string
    nombre: string
    apellidos: string
    telefono: string
    calle: string
    colonia: string
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