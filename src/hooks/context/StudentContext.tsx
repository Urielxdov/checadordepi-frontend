import { createContext } from "react"
import { type AlumnoConfig } from "../../interfaces/ModelsInterfaces"
import { type StudentActions } from "../../interfaces/componentConfig"
import { type StudentStateProps } from "../../interfaces/componentConfig"

type StudentContextType = {
    state: StudentStateProps
    dispatch: React.Dispatch<StudentActions>
    addStudent: (student: AlumnoConfig) => void
    updateStudent: (student: AlumnoConfig) => void
    deleteStudent: (numberControl: string) => void
    searchStudent: (numberControl: string) => void
}

export const StudentsContext = createContext<StudentContextType | undefined>(undefined)
