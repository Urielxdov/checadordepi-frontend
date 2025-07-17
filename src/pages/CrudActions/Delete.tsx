import { type DeleteParameters } from "../../interfaces/CRUDInterfaces";
import QueryInput from "../../componets/utils/Inputs/QueryInput";
import DeleteTable from "../../componets/tables/DeleteTable";

function Delete({module, headers, entity, all, onSearch, onDelete}:DeleteParameters){
    //validar entidad
    if(!entity){
        return(
          <>
            <QueryInput placeholder={"buscar "+module} action={onSearch}/>
            <DeleteTable
              action={onDelete}
              headers={headers}
              body={all}
            />
          </>
        );
    }else{
        return(
          <>
            <QueryInput placeholder={"buscar "+module} action={onSearch}/>
            <DeleteTable
              action={onDelete}
              headers={headers}
              body={[entity]}
            />
          </>  
        );
    }
}

export default Delete;
