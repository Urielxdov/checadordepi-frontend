import type { AlumnoConfig, ProfesorConfig, ProgramaConfig } from "./ModelsInterfaces"



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



export interface TeacherStateProps {
  teachers: ProfesorConfig[]
  teacher?: ProfesorConfig
}

export type TeacherActions =
  | { type: "CREATE_TEACHER", payload: ProfesorConfig }
  | { type: "UPDATE_TEACHER", payload: ProfesorConfig }
  | { type: "DELETE_TEACHER", payload: string }
  | { type: "SEARCH_TEACHER", payload: string }

export interface ProgramStateProps {
  programs: ProgramaConfig[]
  program?: ProgramaConfig
}

export type ProgramActions =
  | { type: "CREATE_PROGRAM", payload: ProgramaConfig }
  | { type: "UPDATE_PROGRAM", payload: ProgramaConfig }
  | { type: "DELETE_PROGRAM", payload: number }
  | { type: "SEARCH_PROGRAM", payload: number }