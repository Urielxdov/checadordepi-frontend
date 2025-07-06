import { createContext } from "react"
import { Alumno } from "../../models/AlumnoModel"
import type { StudentActions } from "../reducers/AlumnoReducer"
import { type StateProps } from "../../interfaces/componentConfig"

type StudentContextType = {
    state: StateProps
    dispatch: React.Dispatch<StudentActions>
    addStudent: (student: Alumno) => void
    updateStudent: (student: Alumno) => void
    deleteStudent: (numberControl: string) => void
    searchStudent: (numberControl: string) => void
}

export const StudentsContext = createContext<StudentContextType | undefined>(undefined)
