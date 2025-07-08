import { Alumno } from "../models/AlumnoModel"
import { ProgramaEstudios } from "../models/ProgramaModel"
import { Profesor } from "../models/ProfesorModel"

export interface FieldProps {
    label: string
    name: string
    type: string
    maxlength?: number
    minlength?: number
    value: any
    catch: (value:any) => void
}

export interface ModalConfig {
    title: string
    message: string
    type: string
}

export interface ReturnButtonConfig {
    path: string
}

export interface StudentStateProps {
  students: Alumno[]
  student?: Alumno
}

export type StudentActions = 
    | { type: "CREATE_STUDENT"; payload: Alumno}
    | { type: "UPDATE_STUDENT"; payload: Alumno}
    | { type: "DELETE_STUDENT"; payload: string}
    | { type: "SEARCH_STUDENT"; payload: string}

export interface TeacherStateProps {
  teachers: Profesor[]
  teacher?: Profesor
}

export type TeacherActions = 
    | {type: "CREATE_TEACHER", payload: Profesor}
    | {type: "UPDATE_TEACHER", payload: Profesor}
    | {type: "DELETE_TEACHER", payload: string}
    | {type: "SEARCH_TEACHER", payload: string}

export interface ProgramStateProps {
  programs: ProgramaEstudios[]
  program?: ProgramaEstudios
}

export type ProgramActions = 
    | {type: "CREATE_PROGRAM", payload: ProgramaEstudios}
    | {type: "UPDATE_PROGRAM", payload: ProgramaEstudios}
    | {type: "DELETE_PROGRAM", payload: number}
    | {type: "SEARCH_PROGRAM", payload: number}