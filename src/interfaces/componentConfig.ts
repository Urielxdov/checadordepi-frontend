import { Alumno } from "../models/entityModels"

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

export interface StateProps {
  students: Alumno[]
  student?: Alumno
}