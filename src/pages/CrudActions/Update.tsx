import QueryInput from "../../componets/utils/Inputs/QueryInput";
import { type UpdateParameters } from "../../interfaces/CRUDInterfaces";
import UpdateTable from "../../componets/tables/UpdateTable";

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
