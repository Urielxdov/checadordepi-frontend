import { useContext } from "react";
import { TeacherContext } from "../context/TeacherContext";

export function useTeachers(){
    //recupera el contexto
    const context = useContext(TeacherContext);
    //validacion de existencia
    if(!context){
        throw new Error("No se puede usar el contexto sin provider");
    }
    //retorno de contexto
    return context
}