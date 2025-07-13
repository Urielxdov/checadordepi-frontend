import { createContext } from 'react'
import { type AlumnoConfig } from '../../interfaces/ModelsInterfaces'
import { type StudentStateProps } from '../../interfaces/componentConfig'
import type { StudentActions } from '../reducers/StudentReducer'

type StudentContextType = {
  state: StudentStateProps
  dispatch: React.Dispatch<StudentActions>
  addStudent: (formData: FormData) => void
  updateStudent: (student: AlumnoConfig) => void
  deleteStudent: (numberControl: string) => void
  searchStudent: (numberControl: string) => void
}

export const StudentsContext = createContext<StudentContextType | undefined>(
  undefined
)
