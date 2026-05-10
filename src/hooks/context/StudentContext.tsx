import { createContext, useContext } from 'react'
import type { EntityStateProps } from '../reducers/entities'
import type { AlumnoModel } from '../../interfaces/Models'

//propiedades del contexto
interface StudentContextType {
    state: EntityStateProps<AlumnoModel>
    getStudents: (page: number, tk:string) => Promise<void>
    addStudent: (student: AlumnoModel, tk:string) => Promise<boolean>
    updateStudent: (updated: AlumnoModel, tk:string) => Promise<boolean>
    deleteStudent: (numberControl: string, tk:string) => Promise<boolean>
    searchStudent: (numberControl: string) => void
}

//contexto
export const StudentsContext = createContext<StudentContextType | undefined>(
  undefined
)

//consumer
export function useStudents() {
    //consumir el contexto
    const context = useContext(StudentsContext);
    //validar el contexto
    if(!context) {
        throw new Error("useStudent debe de usar un provedor de StudentProvider")
    }
    //retornar el contexto
    return context
}
