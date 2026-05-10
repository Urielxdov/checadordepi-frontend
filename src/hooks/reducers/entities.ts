import { useReducer } from "react"
import type { PagedData } from "../../interfaces/httpModels"
import type { BaseModel } from "../../interfaces/Models"

//propiedades de estado
export interface EntityStateProps<T extends BaseModel> {
  entities: Array<T>
  current_page: number
  total: number
  current?: T
}

//estado inicial
const initialState = <T extends BaseModel>():EntityStateProps<T> => ({
    entities: [],
    current_page: 0,
    total: 0
})

//acciones del reducer
type EntityActions = 
    | { type: "GET_ENTITIES", payload: PagedData<BaseModel> }
    | { type: "CREATE_ENTITY"; payload: BaseModel}
    | { type: "UPDATE_ENTITY"; payload: BaseModel}
    | { type: "DELETE_ENTITY"; payload: string}
    | { type: "SEARCH_ENTITY"; payload: string}

//reducer de entidad
const reducer = <T extends BaseModel>(state: EntityStateProps<T>, action: EntityActions) => {
    switch(action.type) {
        case 'GET_ENTITIES':
            return { entities: action.payload.data, current_page: action.payload.page, total: action.payload.total}
        case 'CREATE_ENTITY':
            return {...state, entities: [...state.entities, action.payload] }
        case 'DELETE_ENTITY':
            return {...state, entities: state.entities.filter(entity => entity.id !== action.payload) }
        case 'UPDATE_ENTITY':
            return {...state, entities: state.entities.map(entity => entity.id === action.payload.id ? action.payload : entity) }
        case 'SEARCH_ENTITY':
            return {...state, current: state.entities.find(entity => entity.id === action.payload)}
    }
}

//hook de reducer
export function useEntities<T extends BaseModel>(){
    //declarar el reducer
    const [state,distpach] = useReducer(reducer,initialState());

    //funciones del reducer
    const get_entities = (payload:PagedData<T>) => {
        distpach({ type: "GET_ENTITIES", payload });
    }

    const create_entity = (entity:T) => {
        distpach({ type: "CREATE_ENTITY", payload: entity });
    }

    const delete_entity = (id:string) =>{
        distpach({ type: "DELETE_ENTITY", payload: id });
    }

    const update_entity = (entity:T) =>{
        distpach({ type: "UPDATE_ENTITY", payload: entity });
    }

    const search_entity = (id:string) => {
        distpach({ type: "SEARCH_ENTITY", payload: id });
    }

    //retornar elementos
    return { state, get_entities, create_entity, delete_entity, update_entity, search_entity };
}
