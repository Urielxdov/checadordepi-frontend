import { useEffect, useReducer, type ReactNode } from "react";
import { ProgramContext } from "../context/ProgramContext";
import { type ProgramStateProps } from "../../interfaces/componentConfig";
import { type ProgramActions } from "../../interfaces/componentConfig";
import type { ProgramaConfig } from "../../interfaces/ModelsInterfaces";
import { createProgram, getActivePrograms, updateProgramA, deleteProgramA } from "../../services/programService";
import type { PagedData } from "../../interfaces/httpConfig";

//interfaces de configuracion
interface PropsHook {
    children: ReactNode
}

//estado inicial 
const initialState = () => ({
    programs: [] as Array<ProgramaConfig>,
    current_page: 0,
    total: 0
})

//reducer de profesor
const reducer = (state: ProgramStateProps, action: ProgramActions) => {
    //acciones
    switch(action.type){
        case 'GET_PROGRAMS':
            return {programs: action.payload.data, current_page: action.payload.page, total: action.payload.total}
        case 'CREATE_PROGRAM':
            return {programs: [...state.programs, action.payload], current_page: state.current_page, total: state.total}
        case 'UPDATE_PROGRAM':
            return {programs: state.programs.map(p => p.id == action.payload.id ? action.payload: p), current_page: state.current_page, total: state.total}
        case 'DELETE_PROGRAM':
            return {programs: state.programs.filter( p => p.id != action.payload), current_page: state.current_page, total: state.total}
        case 'SEARCH_PROGRAM':
            return {...state, program: state.programs.find(p => p.id == action.payload)}
    }
}

//provider de profesor
export function ProgramProvider({ children }:PropsHook){
    //uso de reducer
    const [state, dispatch] = useReducer(reducer, initialState());

    //funciones para compartir
    const getPrograms = async (page: number, tk:string):Promise<void> => {
        try{
            //peticion al api
            const programs = await getActivePrograms(page, tk);

            //guardar en el reducer
            dispatch({type:"GET_PROGRAMS", payload: programs as unknown as PagedData<ProgramaConfig>})
        }catch(error){
            console.log(error);
        }
    }

    const addProgram = async (program: ProgramaConfig, tk:string):Promise<boolean> => {
        try{
            //mandar al api
            const result = await createProgram(program, tk);

            //validar el exito
            if(!result.success){ return result.success }

            //guardar en reducer
            dispatch({type: "CREATE_PROGRAM", payload: program});

            //caso de exito
            return result.success;
        }catch(error){
            //mensaje de error y regresar que no se guardo
            console.log(error);
            return false;
        }
    }

    const updateProgram = async (updated: ProgramaConfig, tk:string):Promise<boolean> => {
        try{
            //mandar al api
            const result = await updateProgramA(updated, tk);

            //validar el exito
            if(!result.success){ return result.success }

            //guardar en reducer
            dispatch({type: "UPDATE_PROGRAM", payload: updated});

            //caso de exito
            return result.success;
        }catch(error){
            //mensaje de error y fracaso
            console.log(error);
            return false;
        }
    }

    const deleteProgram = async (id: string, tk:string):Promise<boolean> => {
        try{
            //pedir al api
            const result = await deleteProgramA(id, tk);

            //validar el exito
            if(!result.success){ return result.success }

            //guardar en reducer
            dispatch({type: "DELETE_PROGRAM", payload: id});

            //caso de exito
            return result.success;
        }catch(error){
            //mensaje de error y fracaso
            console.log(error);
            return false;
        }
    }

    const searchProgram = (id: string) => {
        dispatch({type: "SEARCH_PROGRAM", payload: id});
    }

    useEffect(() => {
        const backup = localStorage.getItem("access-token");
        if(backup){
            const jwt = JSON.parse(backup);
            getPrograms(state.current_page, jwt.token);
        }
    },[]);

    //componente del provider
    return (
        <ProgramContext.Provider value={{
            state,
            getPrograms,
            addProgram,
            updateProgram,
            deleteProgram,
            searchProgram
        }}>
            {children}
        </ProgramContext.Provider>
    );
}