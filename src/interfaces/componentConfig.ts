import type { PagedData } from "./httpConfig"
import type { AlumnoConfig, ProfesorConfig, ProgramaConfig } from "./ModelsInterfaces"

export interface FieldConfig {
    label: string
    name: string
    type: string
    maxlength?: number
    minlength?: number
    value?: any
}

export interface StudentStateProps {
  students: AlumnoConfig[]
  current_page: number
  total: number
  student?: AlumnoConfig
}

export interface StudentUpdate {
  oldId: string
  data: AlumnoConfig
}

export type StudentActions = 
    | { type: "GET_STUDENTS", payload: PagedData<AlumnoConfig> }
    | { type: "CREATE_STUDENT"; payload: AlumnoConfig}
    | { type: "UPDATE_STUDENT"; payload: AlumnoConfig}
    | { type: "DELETE_STUDENT"; payload: string}
    | { type: "SEARCH_STUDENT"; payload: string}

export interface TeacherStateProps {
  teachers: ProfesorConfig[]
  current_page: number
  total: number
  teacher?: ProfesorConfig
}

export interface UpdateProfesor{
  oldId: string,
  data: ProfesorConfig
}

export type TeacherActions = 
    | {type: "GET_TEACHERS", payload: PagedData<ProfesorConfig>}
    | {type: "CREATE_TEACHER", payload: ProfesorConfig}
    | {type: "UPDATE_TEACHER", payload: ProfesorConfig}
    | {type: "DELETE_TEACHER", payload: string}
    | {type: "SEARCH_TEACHER", payload: string}

export interface ProgramStateProps {
  programs: ProgramaConfig[]
  current_page: number
  total: number
  program?: ProgramaConfig
}

export interface UpdatePrograma {
  oldId: number,
  data: ProgramaConfig
}

export type ProgramActions = 
    | {type: "GET_PROGRAMS", payload: PagedData<ProgramaConfig>}
    | {type: "CREATE_PROGRAM", payload: ProgramaConfig}
    | {type: "UPDATE_PROGRAM", payload: ProgramaConfig}
    | {type: "DELETE_PROGRAM", payload: string}
    | {type: "SEARCH_PROGRAM", payload: string}