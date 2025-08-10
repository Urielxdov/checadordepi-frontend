import { createContext } from 'react'
import { type StudentStateProps } from '../../interfaces/componentConfig'
import type { StudentActions } from '../../interfaces/componentConfig'
import type { AlumnoConfig } from '../../interfaces/ModelsInterfaces'

type StudentContextType = {
    state: StudentStateProps
    dispatch: React.Dispatch<StudentActions>
    getStudents: (page: number, tk:string) => Promise<void>
    addStudent: (student: AlumnoConfig, tk:string) => Promise<boolean>
    updateStudent: (updated: AlumnoConfig, tk:string) => Promise<boolean>
    deleteStudent: (numberControl: string, tk:string) => Promise<boolean>
    searchStudent: (numberControl: string) => void
}

export const StudentsContext = createContext<StudentContextType | undefined>(
  undefined
)
