import type { BaseModel } from "../../interfaces/ModelsInterfaces";
import { useReducer } from "react";

//configuracion de estado
interface StateProps<T extends BaseModel>{
    data: T[],
    updated?: T
}

//acciones
type UpdateActions<T extends BaseModel> =
    |{ type: 'CHANGE', id: string, key: keyof T,  value: any}
    |{ type: 'UPDATE', id: string }

//reducer
function reduceUpdate<T extends BaseModel>(state:StateProps<T>, action:UpdateActions<T>){
    //operaciones
    switch(action.type){
        case 'CHANGE':
            const newState = {...state};
            newState.data.forEach((e: T) => {
                //filtro
                if(e.id == action.id){
                    //actualizar propiedad
                    e[action.key as keyof T] = action.value
                    return
                }
            })
            return newState;
        case 'UPDATE':
            return {...state, updated: state.data.find((e: T) => e.id == action.id)}
    }
}

//hook de update
export function useUpdate<T extends BaseModel>(copy: T[]){
    //crear el reducer
    const [state, dispatch] = useReducer(reduceUpdate, {data: copy});

    //operaciones
    const handleChange = (id: string, key: string, value: any) => {
        dispatch({type:'CHANGE', id: id, key: key as keyof T, value: value})
    }

    const handleUpdate = (id: string) => {
        dispatch({type: 'UPDATE', id: id})
    }

    //retorno
    return { state, handleChange, handleUpdate }
}