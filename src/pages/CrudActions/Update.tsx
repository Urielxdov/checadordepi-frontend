import QueryInput from "../../componets/utils/Inputs/QueryInput";
import { type UpdateParameters } from "../../interfaces/CRUDInterfaces";
import Table from "../../componets/tables/Table";
import Button from "../../componets/utils/buttons/Button";
import { parseObjectToRow } from "../../utils/ParserObjects";

function Update({module, entity, headers, onSearch, onUpdate}:UpdateParameters){
    if(!entity){
        return (
            <>
                <QueryInput placeholder={'buscar '+module} action={onSearch}/>
                sin registros
            </>
        );
    }else{
        return (
        <>
            <QueryInput placeholder={'buscar '+module} action={onSearch}/>
            <Table
                header={headers}
                body={[parseObjectToRow(entity)]}
            />
            <Button
                text="actualizar"
                action={() => {}}
                submit={false}
                styles="p-1 text-white bg-green-500 rounded-sm
                hover: bg-green-600 hover: cursor-pointer
                "
            />
        </>
        );
    }
}

export default Update;