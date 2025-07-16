import type { AlumnoConfig, ProfesorConfig, ProgramaConfig } from "./ModelsInterfaces"

export interface FieldProps {
    label: string
    name: string
    type: string
    maxlength?: number
    minlength?: number
    value?: any
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
  students: AlumnoConfig[]
  student?: AlumnoConfig
}

export interface StudentUpdate {
  oldId: string
  data: AlumnoConfig
}

export type StudentActions = 
    | { type: "CREATE_STUDENT"; payload: AlumnoConfig}
    | { type: "UPDATE_STUDENT"; payload: StudentUpdate}
    | { type: "DELETE_STUDENT"; payload: string}
    | { type: "SEARCH_STUDENT"; payload: string}

export interface TeacherStateProps {
  teachers: ProfesorConfig[]
  teacher?: ProfesorConfig
}

export interface TeacherUpdate {
  oldId: string,
  data: ProfesorConfig
}

export type TeacherActions = 
    | {type: "CREATE_TEACHER", payload: ProfesorConfig}
    | {type: "UPDATE_TEACHER", payload: TeacherUpdate}
    | {type: "DELETE_TEACHER", payload: string}
    | {type: "SEARCH_TEACHER", payload: string}

export interface ProgramStateProps {
  programs: ProgramaConfig[]
  program?: ProgramaConfig
}

export interface ProgramUpdate {
  oldId: string
  data: ProgramaConfig
}

export type ProgramActions = 
    | {type: "CREATE_PROGRAM", payload: ProgramaConfig}
    | {type: "UPDATE_PROGRAM", payload: ProgramUpdate}
    | {type: "DELETE_PROGRAM", payload: number}
    | {type: "SEARCH_PROGRAM", payload: number}