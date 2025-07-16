import { useReducer, type ReactNode } from "react";
import { TeacherContext } from "../context/TeacherContext";
import { type TeacherStateProps } from "../../interfaces/componentConfig";
import type { ProfesorConfig } from "../../interfaces/ModelsInterfaces";
import { type TeacherActions } from "../../interfaces/componentConfig";

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
    const addTeacher = (teacher: ProfesorConfig) => {
        dispatch({type: "CREATE_TEACHER", payload: teacher});
    }

    const updateTeacher = (data: Array<any>) => {
        const teacher = parseArray(data);
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

function parseArray(data: Array<any>){
    return {
        oldId: data[0],
        data: {
            id: data[1],
            nombre: data[2],
            apellidos: data[3],
            telefono: data[4],
            correo: data[5],
            grado: data[6],
            nombre_grado: data[7],
            status: data[8]
        } as ProfesorConfig
    }
}