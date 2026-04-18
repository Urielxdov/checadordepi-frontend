import QueryInput from "../../components/interactives/inputs/QueryInput";
import { type BaseModel } from "../../interfaces/Models";
import UpdateTable from "../../components/ui/tables/UpdateTable";

export interface UpdateParameters {
    module: string,
    entity: BaseModel | undefined
    all: BaseModel[]
    headers: Array<string>
    onSearch: (s:string) => void
    onUpdate: (updated: BaseModel) => void
}

function Update({module, entity, headers, all, onSearch, onUpdate}:UpdateParameters){
    if(!entity){
        return (
            <>
                <QueryInput placeholder={'buscar '+module} action={onSearch}/>
                <UpdateTable
                    action={onUpdate}
                    headers={headers}
                    body={all}
                />
            </>
        );
    }else{
        return (
        <>
            <QueryInput placeholder={'buscar '+module} action={onSearch}/>
            <UpdateTable
                action={onUpdate}
                headers={headers}
                body={[entity]}
            />
        </>
        );
    }
}

export default Update
