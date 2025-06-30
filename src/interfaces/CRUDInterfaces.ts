import { Alumno, Profesor, ProgramaEstudios } from "../models/entityModels"
import { type FieldProps } from "./componentConfig"

export interface IndexParameters {
    title: string,
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