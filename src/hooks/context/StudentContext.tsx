import { createContext } from 'react'
import { type StudentStateProps } from '../reducers/StudentReducer'
import type { AlumnoModel } from '../../interfaces/Models'

type StudentContextType = {
    state: StudentStateProps
    getStudents: (page: number, tk:string) => Promise<void>
    addStudent: (student: AlumnoModel, tk:string) => Promise<boolean>
    updateStudent: (updated: AlumnoModel, tk:string) => Promise<boolean>
    deleteStudent: (numberControl: string, tk:string) => Promise<boolean>
    searchStudent: (numberControl: string) => void
}

export const StudentsContext = createContext<StudentContextType | undefined>(
  undefined
)
