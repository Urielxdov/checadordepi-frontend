import { Alumno } from "../models/AlumnoModel"
import { Profesor } from "../models/ProfesorModel"
import { ProgramaEstudios } from "../models/ProgramaModel"
import { type FieldProps } from "./componentConfig"

export interface IndexParameters {
    headers: Array<string>,
    data: Array<any>
}

export interface DeleteParameters {
    module: string
    headers: Array<string>
    entity: Alumno | Profesor | ProgramaEstudios
    onSearch: (s:string) => void
    onDelete: () => void
}

export interface CreateParameters {
    module: string
    fields: Array<FieldProps>
    formHandler: (e: React.FormEvent<HTMLFormElement>) => void
}

export interface UpdateParameters {
    module: string,
    entity: Alumno | Profesor | ProgramaEstudios | undefined
    fields: Array<FieldProps>,
    onSearch: (s: string) => void
    onUpdate: (e: React.FormEvent<HTMLFormElement>) => void
}