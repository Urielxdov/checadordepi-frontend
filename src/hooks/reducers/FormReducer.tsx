import { useReducer } from "react";
import type { AlumnoConfig, ProfesorConfig, ProgramaConfig, LoginConfig } from "../../interfaces/ModelsInterfaces";

//propiedades de eestados
interface StateProps<T> {
    data: T
}

//acciones
type FormActions<T> =
    |{type:'CHANGE', key: keyof T, value: any}
    |{type:'SET', set: T}
    |{type:'RESET', reset: T}

//reducer de formulario
function reduceForm<T>(state: StateProps<T>, action:FormActions<T>){
    //acciones
    switch(action.type){
        case 'CHANGE':
            const newData = {...state.data}
            newData[action.key] = action.value
            return {data: newData}
        case 'SET':
            return {data: action.set}
        case 'RESET':
            return {data: action.reset}
    }
}

//estados einiciales
const initialStates = () => ({
    Alumno: {
        id: "",
        nombre: "",
        apellidos: "",
        telefono: "",
        calle: "",
        colonia: "",
        correo: "",
        status: "",
        profesor: "",
        programa: ""
    } as AlumnoConfig,
    Profesor: {
        id: "",
        nombre: "",
        apellidos: "",
        telefono: "",
        correo: "",
        grado: "",
        nombre_grado: "",
        status: ""
    } as ProfesorConfig,
    Programa: {
        id: "",
        nombre: "",
        registro: "",
        status: ""
    } as ProgramaConfig,
    Login: {
        user: '',
        password: ''
    } as LoginConfig
})

export function useForm(module: 'Alumno'|'Profesor'|'Programa'|'Login'){
    //obtener estado inicial
    const initialState = initialStates()[module]
    //usar el reducer
    const [state, dispatch] = useReducer(reduceForm,{ data: initialState });

    //manej0 de cambio
    const handleChange = (key: string, value: any) => {
        dispatch({type: 'CHANGE', key: key as keyof typeof initialState, value: value});
    }

    //predefinir valores
    const setValue = (set: object) => {
        dispatch({type:'SET', set: set as typeof initialState});
    } 

    //lipieza de formulario
    const resetForm = () => {
        dispatch({type: 'RESET', reset: initialState});
    }

    return { state, handleChange, setValue, resetForm }
}