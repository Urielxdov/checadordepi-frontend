import { createContext } from "react"
import { Alumno } from "../../models/AlumnoModel"
import { type StudentActions } from "../../interfaces/componentConfig"
import { type StudentStateProps } from "../../interfaces/componentConfig"

type StudentContextType = {
    state: StudentStateProps
    dispatch: React.Dispatch<StudentActions>
    addStudent: (student: Alumno) => void
    updateStudent: (student: Alumno) => void
    deleteStudent: (numberControl: string) => void
    searchStudent: (numberControl: string) => void
}

export const StudentsContext = createContext<StudentContextType | undefined>(undefined)
