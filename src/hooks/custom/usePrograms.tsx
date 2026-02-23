import { useContext } from "react";
import { ProgramContext } from "../context/ProgramContext";

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