import { createContext } from "react"
import type { Student } from "../../models/Student"
import type { StudentActions } from "../reducers/AlumnoReducer"

type StudentContextType = {
    state: Student[]
    dispatch: React.Dispatch<StudentActions>
    addStudent: (student: Student) => void
    updateStudent: (student: Student) => void
    deleteStudent: (numberControl: string) => void
}

export const StudentsContext = createContext<StudentContextType | undefined>(undefined)
