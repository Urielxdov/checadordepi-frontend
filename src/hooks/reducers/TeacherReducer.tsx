import { useReducer, type ReactNode } from "react";
import { TeacherContext } from "../context/TeacherContext";
import { type TeacherStateProps } from "../../interfaces/componentConfig";
import { Profesor } from "../../models/ProfesorModel";
import { type TeacherActions } from "../../interfaces/componentConfig";

//interfaces de configuracion
interface PropsHook {
    children: ReactNode
}


//estado inicial 
const initialState = () => ({
    teachers: [new Profesor({
        id: "12345",
        nombre: "Juan",
        apellidos: "Lopez",
        telefono: "4771112233",
        correo: "jlopez@mail.com",
        grado: "doctorado",
        nombre_grado: "doctorado en ciencias de la ingenieria",
        status: "activo"
    })]
})

//reducer de profesor
const reducer = (state: TeacherStateProps, action: TeacherActions) => {
    //acciones
    switch(action.type){
        case 'CREATE_TEACHER':
            return {teachers: [...state.teachers, action.payload]}
        case 'UPDATE_TEACHER':
            return {teachers: state.teachers.map(t => t.id == action.payload.id ? action.payload: t)}
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
    const addTeacher = (teacher: Profesor) => {
        dispatch({type: "CREATE_TEACHER", payload: teacher});
    }

    const updateTeacher = (teacher: Profesor) => {
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