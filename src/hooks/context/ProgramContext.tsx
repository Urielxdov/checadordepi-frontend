import { createContext, useContext } from "react";
import type { ProgramaModel } from "../../interfaces/Models";
import type { EntityStateProps } from "../reducers/entities";

//propiedades del contexto
interface ProgramContextConfig {
    state: EntityStateProps<ProgramaModel>,
    getPrograms: (page: number, tk: string) => Promise<void>,
    addProgram: (program: ProgramaModel, tk: string) => Promise<boolean>,
    updateProgram: (updated: ProgramaModel, tk: string) => Promise<boolean>,
    deleteProgram: (id: string, tk: string) => Promise<boolean>,
    searchProgram: (id: string) => void
}

//contexti
export const ProgramContext = createContext<ProgramContextConfig | undefined>(undefined);

//consumer
export function usePrograms(){
    //recupera el contexto
    const context = useContext(ProgramContext);
    //validacion de provider
    if(!context){
        throw new Error("No se puede usar el contexto sin provider");
    }
    //retorno del contexto
    return context;
}