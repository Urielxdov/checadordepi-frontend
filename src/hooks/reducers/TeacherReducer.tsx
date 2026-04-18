import { useEffect, useReducer, type ReactNode } from "react";
import { TeacherContext } from "../context/TeacherContext";
import type { ProfesorModel } from "../../interfaces/Models";
import { createTeacher, getActiveTeachers, updateTeacherA, deleteTeacherA } from "../../services/teacherService";
import type { PagedData } from "../../interfaces/httpModels";

export interface TeacherStateProps {
  teachers: ProfesorModel[]
  current_page: number
  total: number
  teacher?: ProfesorModel
}

//estado inicial 
const initialState = () => ({ 
    teachers: [] as Array<ProfesorModel>,
    current_page: 0,
    total: 0
 })

type TeacherActions = 
    | {type: "GET_TEACHERS", payload: PagedData<ProfesorModel>}
    | {type: "CREATE_TEACHER", payload: ProfesorModel}
    | {type: "UPDATE_TEACHER", payload: ProfesorModel}
    | {type: "DELETE_TEACHER", payload: string}
    | {type: "SEARCH_TEACHER", payload: string}

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

//interfaces de configuracion
interface PropsHook {
    children: ReactNode
}

//provider de profesor
export function TeacherProvider({ children }:PropsHook){
    //uso de reducer
    const [state, dispatch] = useReducer(reducer, initialState());

    //funciones para compartir
    const getTeachers = async (page: number, tk:string):Promise<void> => {
        try{
            //pedir los profesores
            const teachers = await getActiveTeachers(page, tk);

            //guardar en reducer
            dispatch({type: "GET_TEACHERS", payload: teachers as unknown as PagedData<ProfesorModel>});
        }catch(error){
            console.log(error);
        }
    }

    const addTeacher = async (teacher: ProfesorModel, tk:string):Promise<boolean> => {
        try{
            //esperar respuesta
            const result = await createTeacher(teacher, tk);

            //validar exito
            if(!result.success){ return result.success }

            //guardar en reducer
            dispatch({type: "CREATE_TEACHER", payload: teacher});
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
            if(!result.success){ return result.success }

            //modificar el reducer
            dispatch({type: "UPDATE_TEACHER", payload: updated});
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
            if(!result.success){ return result.success }

            //modificar el reducer
            dispatch({type: "DELETE_TEACHER", payload: clave});
            return result.success;
        }catch(error){
            console.log(error);
            return false;
        }
    }

    const searchTeacher = (clave: string) => {
        dispatch({type: "SEARCH_TEACHER", payload: clave});
    }

    useEffect(()=>{
        const backup = localStorage.getItem("access-token");
        if(backup){
            const jwt = JSON.parse(backup);
            getTeachers(state.current_page, jwt.token);
        }
    },[]);

    //componente del provider
    return (
        <TeacherContext.Provider value={{
            state,
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