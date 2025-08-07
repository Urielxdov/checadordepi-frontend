import { createContext } from 'react'
import { type StudentStateProps } from '../../interfaces/componentConfig'
import type { StudentActions } from '../reducers/StudentReducer'

type StudentContextType = {
    state: StudentStateProps
    dispatch: React.Dispatch<StudentActions>
    getStudents: (page: number) => Promise<void>
    addStudent: (student: AlumnoConfig) => Promise<boolean>
    updateStudent: (updated: AlumnoConfig) => Promise<boolean>
    deleteStudent: (numberControl: string) => Promise<boolean>
    searchStudent: (numberControl: string) => void
}

export const StudentsContext = createContext<StudentContextType | undefined>(
  undefined
)
