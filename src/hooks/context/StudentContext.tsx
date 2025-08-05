import { createContext } from "react"
import { type AlumnoConfig } from "../../interfaces/ModelsInterfaces"
import { type StudentActions } from "../../interfaces/componentConfig"
import { type StudentStateProps } from "../../interfaces/componentConfig"

type StudentContextType = {
    state: StudentStateProps
    dispatch: React.Dispatch<StudentActions>
    getStudents: (page: number) => Promise<void>
    addStudent: (student: AlumnoConfig) => Promise<boolean>
    updateStudent: (updated: AlumnoConfig) => Promise<boolean>
    deleteStudent: (numberControl: string) => Promise<boolean>
    searchStudent: (numberControl: string) => void
}

export const StudentsContext = createContext<StudentContextType | undefined>(undefined)
