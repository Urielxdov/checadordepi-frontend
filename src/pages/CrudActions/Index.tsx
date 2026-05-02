import { Table } from "../../components/ui/tables/Table";
import type { BaseModel } from "../../interfaces/Models";
import QueryInput from "../../components/interactives/inputs/QueryInput";

//props de index
interface IndexParameters<T extends BaseModel>{
    headers: Array<string>
    body: Array<T>
    entity?: T
    onSearch: (s:string) => void
}

//vista de index
export default function Index<T extends BaseModel>({ headers, body, entity, onSearch }:IndexParameters<T>){
    //vista de index(sin buscar)
    return (
        <>
            <QueryInput 
                action={onSearch} 
                placeholder="buscar entidad"
            />
            <Table
                header={headers}
                body={entity ? [entity] : body}
            />
        </>
    );
}