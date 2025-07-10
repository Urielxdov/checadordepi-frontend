import { type DeleteParameters } from "../../interfaces/CRUDInterfaces";
import QueryInput from "../../componets/utils/Inputs/QueryInput";
import Table from "../../componets/tables/Table";
import Button from "../../componets/utils/buttons/Button";
import { parseObjectToRow } from "../../utils/ParserObjects";

function Delete({module, headers, entity, onSearch, onDelete}:DeleteParameters){
    //validar entidad
    if(!entity){
        return(
          <>
            <QueryInput placeholder={"buscar "+module} action={onSearch}/>
            Sin registros
          </>
        );
    }else{
        return(
          <>
            <QueryInput placeholder={"buscar "+module} action={onSearch}/>
            <Table
              header={headers}
              body={[parseObjectToRow(entity)]}
            />
            <Button
              text="eliminar"
              action={onDelete}
              submit={false}
              styles="p-1 text-white bg-red-500 rounded-sm
                    hover: bg-red-600 hover: cursor-pointer
                    "
            />
          </>  
        );
    }
}

export default Delete;
