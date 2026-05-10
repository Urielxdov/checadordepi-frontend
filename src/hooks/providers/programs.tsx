import { useEffect, type ReactNode } from "react";
import { ProgramContext } from "../context/ProgramContext";
import type { ProgramaModel } from "../../interfaces/Models";
import { createProgram, getActivePrograms, updateProgramA, deleteProgramA } from "../../services/programService";
import { useEntities, type EntityStateProps } from "../reducers/entities";
import { useAuth } from "../context/AuthContext";

//propiedades del provider
interface PropsHook {
    children: ReactNode
}

//provider de profesor
export function ProgramProvider({ children }:PropsHook){
    //contexto de autenticacion
    const authctx = useAuth();

    //uso de reducer
    const reducer = useEntities();

    //funciones para compartir
    const getPrograms = async (page: number, tk:string):Promise<void> => {
        try{
            //peticion al api
            const programs = await getActivePrograms(page, tk);

            //guardar en el reducer
            reducer.get_entities(programs)
        }catch(error){
            console.log(error);
        }
    }

    const addProgram = async (program: ProgramaModel, tk:string):Promise<boolean> => {
        try{
            //mandar al api
            const result = await createProgram(program, tk);

            //validar el exito
            if(result.success){
                //guardar en reducer
                reducer.create_entity(program);
            }

            //caso de exito
            return result.success;
        }catch(error){
            //mensaje de error y regresar que no se guardo
            console.log(error);
            return false;
        }
    }

    const updateProgram = async (updated: ProgramaModel, tk:string):Promise<boolean> => {
        try{
            //mandar al api
            const result = await updateProgramA(updated, tk);

            //validar el exito
            if(!result.success){
                //guardar en reducer
                reducer.update_entity(updated);
            }

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
            if(!result.success){
                //guardar en reducer
                reducer.delete_entity(id);
            }

            //caso de exito
            return result.success;
        }catch(error){
            //mensaje de error y fracaso
            console.log(error);
            return false;
        }
    }

    const searchProgram = (id: string) => {
        reducer.search_entity(id);
    }

    useEffect(() => {
        if(authctx.token){
            getPrograms(reducer.state.current_page, authctx.token);
        }
    },[]);

    //componente del provider
    return (
        <ProgramContext.Provider value={{
            state: reducer.state as EntityStateProps<ProgramaModel>,
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