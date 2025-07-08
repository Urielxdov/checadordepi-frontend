import { useReducer, type ReactNode } from "react";
import { ProgramContext } from "../context/ProgramaContext";
import { type ProgramStateProps } from "../../interfaces/componentConfig";
import { type ProgramActions } from "../../interfaces/componentConfig";
import { ProgramaEstudios } from "../../models/ProgramaModel";

//interfaces de configuracion
interface PropsHook {
    children: ReactNode
}

//estado inicial 
const initialState = () => ({
    programs: [new ProgramaEstudios({
        id: 1,
        nombre: "Mestria en ciencias de la ingenieria",
        registro: "TECNM-MCI",
        status: "activo"
    })]
})

//reducer de profesor
const reducer = (state: ProgramStateProps, action: ProgramActions) => {
    //acciones
    switch(action.type){
        case 'CREATE_PROGRAM':
            return {programs: [...state.programs, action.payload]}
        case 'UPDATE_PROGRAM':
            return {programs: state.programs.map(p => p.id == action.payload.id ? action.payload: p)}
        case 'DELETE_PROGRAM':
            return {programs: state.programs.filter( p => p.id != action.payload)}
        case 'SEARCH_PROGRAM':
            return {...state, program: state.programs.find(p => p.id == action.payload)}
    }
}

//provider de profesor
export function ProgramProvider({ children }:PropsHook){
    //uso de reducer
    const [state, dispatch] = useReducer(reducer, initialState());

    //funciones para compartir
    const addProgram = (program: ProgramaEstudios) => {
        dispatch({type: "CREATE_PROGRAM", payload: program});
    }

    const updateProgram = (program: ProgramaEstudios) => {
        dispatch({type: "UPDATE_PROGRAM", payload: program});
    }

    const deleteProgram = (id: number) => {
        dispatch({type: "DELETE_PROGRAM", payload: id});
    }

    const searchProgram = (id: number) => {
        dispatch({type: "SEARCH_PROGRAM", payload: id});
    }

    //componente del provider
    return (
        <ProgramContext.Provider value={{
            state,
            dispatch,
            addProgram,
            updateProgram,
            deleteProgram,
            searchProgram
        }}>
            {children}
        </ProgramContext.Provider>
    );
}