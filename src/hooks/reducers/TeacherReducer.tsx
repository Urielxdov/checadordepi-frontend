import { useReducer, type ReactNode } from "react";
import { TeacherContext } from "../context/TeacherContext";
import { type TeacherStateProps } from "../../interfaces/componentConfig";
import type { ProfesorConfig } from "../../interfaces/ModelsInterfaces";
import { type TeacherActions } from "../../interfaces/componentConfig";
import type { UpdateProfesor } from "../../interfaces/componentConfig";

//interfaces de configuracion
interface PropsHook {
    children: ReactNode
}

//estado inicial 
const initialState = () => ({
    teachers: [{
        id: "12345",
        nombre: "Juan",
        apellidos: "Lopez",
        telefono: "4771112233",
        correo: "jlopez@mail.com",
        grado: "doctorado",
        nombre_grado: "doctorado en ciencias de la ingenieria",
        status: "activo"
    }]
})

//reducer de profesor
const reducer = (state: TeacherStateProps, action: TeacherActions) => {
    //acciones
    switch(action.type){
        case 'CREATE_TEACHER':
            return {teachers: [...state.teachers, action.payload]}
        case 'UPDATE_TEACHER':
            return {teachers: state.teachers.map(t => t.id == action.payload.oldId ? action.payload.data: t)}
        case 'DELETE_TEACHER':
            return {teachers: state.teachers.filter( t => t.id != action.payload)}
        case 'SEARCH_TEACHER':
            return {...state, teacher: state.teachers.find(t => t.id == action.payload)}
    }
}

//provider de profesor
export function TeacherProvider({ children }:PropsHook){
    //uso de reducer
    const [state, dispatch] = useReducer(reducer, initialState());

    //funciones para compartir
    const addTeacher = (data: FormData) => {
        const teacher = formDataToProfesorConfig(data)
        dispatch({type: "CREATE_TEACHER", payload: teacher});
    }

    const updateTeacher = (data: FormData) => {
        const teacher = formDataUpdateToProfesorConfig(data)
        dispatch({type: "UPDATE_TEACHER", payload: teacher});
    }

    const deleteTeacher = (clave: string) => {
        dispatch({type: "DELETE_TEACHER", payload: clave});
    }

    const searchTeacher = (clave: string) => {
        dispatch({type: "SEARCH_TEACHER", payload: clave});
    }

    //componente del provider
    return (
        <TeacherContext.Provider value={{
            state,
            dispatch,
            addTeacher,
            updateTeacher,
            deleteTeacher,
            searchTeacher
        }}>
            {children}
        </TeacherContext.Provider>
    );
}

function formDataToProfesorConfig (data: FormData): ProfesorConfig {
  return {
    id: data.get('id') as string,
    nombre: data.get('nombre') as string,
    apellidos: data.get('apellidos') as string,
    telefono: data.get('telefono') as string,
    correo: data.get('correo') as string,
    grado: data.get('grado') as string,
    nombre_grado: data.get('nombre_grado') as string,
    status: data.get('status') ? data.get('status') as string : 'activo'
  }
}

function formDataUpdateToProfesorConfig (data: FormData): UpdateProfesor {
  return {
        oldId: data.get('clave') as string,
        data: {
        id: data.get('id') as string,
        nombre: data.get('nombre') as string,
        apellidos: data.get('apellidos') as string,
        telefono: data.get('telefono') as string,
        correo: data.get('correo') as string,
        grado: data.get('grado') as string,
        nombre_grado: data.get('nombre_grado') as string,
        status: data.get('status') as string
        }
    }
}