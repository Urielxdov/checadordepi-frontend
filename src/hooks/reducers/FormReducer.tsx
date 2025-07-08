import { useReducer } from "react";
import { type AlumnoConfig, type ProfesorConfig, type ProgramaConfig } from "../../interfaces/ModelsInterfaces";

type ChangeConfig = {
    name: string,
    value: string | number
}

type ActionProps<T> = 
   | { type: "CHANGE"; payload: ChangeConfig}
   | { type: "PUT"; payload: T };

//modelo de login
export type LoginConfig = {
    user: string
    pass: string
}

//estado inicial
const initialStates = {
    Alumno: ():AlumnoConfig => ({
        id: "",
        nombre: "",
        apellidos: "",
        telefono: "",
        calle: "",
        colonia: "",
        correo: "",
        status: "activo"
    }),
    Profesor: ():ProfesorConfig => ({
        id: "",
        nombre: "",
        apellidos: "",
        telefono:"",
        correo: "",
        grado: "",
        nombre_grado: "",
        status: ""
    }),
    Programa: ():ProgramaConfig => ({
        id: 0,
        nombre: "",
        registro: "",
        status: ""
    }),
    Login:():LoginConfig => ({
        user: "",
        pass: ""
    })
}


//reducer de formulario
function formReducer<T>(state:T, action:ActionProps<T>):T{
    switch (action.type) {
        case "CHANGE":
            return {...state, [action.payload.name]: action.payload.value};
        case "PUT":
            return action.payload
        default:
            return state;
    }
}

//hook de formulario
function useForm<T>(type:"Alumno" | "Profesor" | "Programa" | "Login"){
    //crear el state y dispatch
    const initialState = initialStates[type]() as T;
    const [state, dispatch] = useReducer(formReducer<T>, initialState);

    //funcion de manejo e cambio
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({type: "CHANGE", payload: {name: e.target.name, value: e.target.value}});
    }

    //funcion de reseteo de campos
    const reset = () => {
        dispatch({type: "PUT", payload: initialState});
    }

    //funcion para poner datos en el formulario
    const setData = (data: T) => {
        dispatch({type: "PUT", payload: data});
    }

    //retorno de cosas
    return {state, handleChange, reset, setData}
}

export default useForm;

