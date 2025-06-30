import { createContext } from "react"
import { Alumno } from "../../models/entityModels"
import type { StudentActions } from "../reducers/AlumnoReducer"

type StudentContextType = {
    state: Alumno[]
    dispatch: React.Dispatch<StudentActions>
    addStudent: (student: Alumno) => void
    updateStudent: (student: Alumno) => void
    deleteStudent: (numberControl: string) => void
}

export const StudentsContext = createContext<StudentContextType | undefined>(undefined)
