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
    id: string
    nombre: string
    registro: string
    status: string
}

export interface Dumpable {
    toJson: () => Record<string, string | number>
    toArray: () => Array<string>
}