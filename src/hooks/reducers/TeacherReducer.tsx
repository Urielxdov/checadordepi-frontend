import { useEffect, useReducer, type ReactNode } from "react";
import { TeacherContext } from "../context/TeacherContext";
import { type TeacherStateProps } from "../../interfaces/componentConfig";
import type { ProfesorConfig } from "../../interfaces/ModelsInterfaces";
import { type TeacherActions } from "../../interfaces/componentConfig";
import { createTeacher, getActiveTeachers, updateTeacherA, deleteTeacherA } from "../../services/teacherService";
import type { PagedData } from "../../interfaces/httpConfig";

//interfaces de configuracion
interface PropsHook {
    children: ReactNode
}


//estado inicial 
const initialState = () => ({ 
    teachers: [] as Array<ProfesorConfig>,
    current_page: 0,
    total: 0
 })

//reducer de profesor
const reducer = (state: TeacherStateProps, action: TeacherActions) => {
    //acciones
    switch(action.type){
        case 'GET_TEACHERS':
            return {teachers: action.payload.data, current_page: action.payload.page, total: action.payload.total}
        case 'CREATE_TEACHER':
            return {teachers: [...state.teachers, action.payload], current_page: state.current_page, total: state.total}
        case 'UPDATE_TEACHER':
            return {teachers: state.teachers.map(t => t.id == action.payload.id ? action.payload: t), current_page: state.current_page, total: state.total}
        case 'DELETE_TEACHER':
            return {teachers: state.teachers.filter( t => t.id != action.payload), current_page: state.current_page, total: state.total}
        case 'SEARCH_TEACHER':
            return {...state, teacher: state.teachers.find(t => t.id == action.payload)}
    }
}

//provider de profesor
export function TeacherProvider({ children }:PropsHook){
    //uso de reducer
    const [state, dispatch] = useReducer(reducer, initialState());

    //funciones para compartir
    const getTeachers = async (page: number):Promise<void> => {
        try{
            //pedir los profesores
            const teachers = await getActiveTeachers(page);

            //guardar en reducer
            dispatch({type: "GET_TEACHERS", payload: teachers as unknown as PagedData<ProfesorConfig>});
        }catch(error){
            console.log(error);
        }
    }


    const addTeacher = async (teacher: ProfesorConfig):Promise<boolean> => {
        try{
            //esperar respuesta
            await createTeacher(teacher);
            //guardar en reducer
            dispatch({type: "CREATE_TEACHER", payload: teacher});
            return true;
        }catch(error){
            console.error(error);
            return false;
        }
    }

    const updateTeacher = async (updated: ProfesorConfig):Promise<boolean> => {
        try{
            //esperar respuesta
            await updateTeacherA(updated);
            //modificar el reducer
            dispatch({type: "UPDATE_TEACHER", payload: updated});
            return true;
        }catch(error){
            console.log(error);
            return false
        }
    }

    const deleteTeacher = async (clave: string):Promise<boolean> => {
        try{
            //esperar respuesta
            await deleteTeacherA(clave);
            //modificar el reducer
            dispatch({type: "DELETE_TEACHER", payload: clave});
            return true;
        }catch(error){
            console.log(error);
            return false;
        }
    }

    const searchTeacher = (clave: string) => {
        dispatch({type: "SEARCH_TEACHER", payload: clave});
    }

    useEffect(()=>{
        getTeachers(state.current_page);
    },[]);

    //componente del provider
    return (
        <TeacherContext.Provider value={{
            state,
            dispatch,
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