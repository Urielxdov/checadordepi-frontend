import { useReducer, type ReactNode } from "react";
import { ProgramContext } from "../context/ProgramaContext";
import { type ProgramStateProps } from "../../interfaces/componentConfig";
import { type ProgramActions } from "../../interfaces/componentConfig";
import type { ProgramaConfig } from "../../interfaces/ModelsInterfaces";
import { getPrograms } from "../../services/programService";

//interfaces de configuracion
interface PropsHook {
    children: ReactNode
}

//estado inicial 
const initialState = () => {
    const data = { programs: [] as Array<ProgramaConfig> }
    getPrograms().then(paged => data.programs = paged.data).catch(e => console.log(e))
    return data
}

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
    const addProgram = (program: ProgramaConfig) => {
        dispatch({type: "CREATE_PROGRAM", payload: program});
    }

    const updateProgram = (updated: ProgramaConfig) => {
        dispatch({type: "UPDATE_PROGRAM", payload: updated});
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