import { useEffect, type ReactNode } from "react";
import { TeacherContext } from "../context/TeacherContext";
import type { ProfesorModel } from "../../interfaces/Models";
import { createTeacher, getActiveTeachers, updateTeacherA, deleteTeacherA } from "../../services/teacherService";
import { useEntities, type EntityStateProps } from "../reducers/entities";
import { useAuth } from "../context/AuthContext";

//propiedades del provider
interface TeacherProviderProps {
    children: ReactNode
}

//provider de profesor
export function TeacherProvider({ children }:TeacherProviderProps){
    //contexto de autenticacion
    const authctx = useAuth();

    //uso de reducer
    const reducer = useEntities<ProfesorModel>();

    //funciones para compartir
    const getTeachers = async (page: number, tk:string):Promise<void> => {
        try{
            //pedir los profesores
            const teachers = await getActiveTeachers(page, tk);

            //guardar en reducer
            reducer.get_entities(teachers);
        }catch(error){
            console.log(error);
        }
    }

    const addTeacher = async (teacher: ProfesorModel, tk:string):Promise<boolean> => {
        try{
            //esperar respuesta
            const result = await createTeacher(teacher, tk);

            //validar exito
            if(result.success){
                //guardar en reducer
                reducer.create_entity(teacher);
            }
            return result.success;
        }catch(error){
            console.error(error);
            return false;
        }
    }

    const updateTeacher = async (updated: ProfesorModel, tk:string):Promise<boolean> => {
        try{
            //esperar respuesta
            const result = await updateTeacherA(updated, tk);

            //validar exito
            if(result.success){
                //modificar el reducer
                reducer.update_entity(updated);
            }

            return result.success;
        }catch(error){
            console.log(error);
            return false
        }
    }

    const deleteTeacher = async (clave: string, tk:string):Promise<boolean> => {
        try{
            //esperar respuesta
            const result = await deleteTeacherA(clave, tk);

            //validar exito
            if(result.success){
                //modificar el reducer
                reducer.delete_entity(clave);
            }
            return result.success;
        }catch(error){
            console.log(error);
            return false;
        }
    }

    const searchTeacher = (clave: string) => {
        reducer.search_entity(clave);
    }

    useEffect(()=>{
        //validar token
        if(authctx.token){
            getTeachers(reducer.state.current_page, authctx.token);
        }
    },[]);

    //componente del provider
    return (
        <TeacherContext.Provider value={{
            state: reducer.state as EntityStateProps<ProfesorModel>,
            getTeachers,
            addTeacher,
            updateTeacher,
            deleteTeacher,
            searchTeacher
        }}>
            {children}
        </TeacherContext.Provider>
    );
}