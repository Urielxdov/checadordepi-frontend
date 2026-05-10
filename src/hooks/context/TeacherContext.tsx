import { createContext, useContext } from "react";
import type { ProfesorModel } from "../../interfaces/Models";
import type { EntityStateProps } from "../reducers/entities";

//propiedades del contexto
interface TeacherContextConfig {
    state: EntityStateProps<ProfesorModel>,
    getTeachers: (page: number, tk:string) => Promise<void>
    addTeacher: (teacher: ProfesorModel, tk:string) => Promise<boolean>,
    updateTeacher: (updated: ProfesorModel, tk:string) => Promise<boolean>,
    deleteTeacher: (clave: string, tk:string) => Promise<boolean>,
    searchTeacher: (clave: string) => void
}

//contexto
export const TeacherContext = createContext<TeacherContextConfig | undefined>(undefined);

//consumer
export function useTeachers(){
    //recupera el contexto
    const context = useContext(TeacherContext);
    //validacion de existencia
    if(!context){
        throw new Error("No se puede usar el contexto sin provider");
    }
    //retorno de contexto
    return context
}