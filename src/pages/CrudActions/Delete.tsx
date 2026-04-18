import { type BaseModel } from "../../interfaces/Models";
import QueryInput from "../../components/utils/Inputs/QueryInput";
import DeleteTable from "../../components/tables/DeleteTable";

export interface DeleteParameters {
    module: string
    headers: Array<string>
    entity: BaseModel | undefined
    all: BaseModel[]
    onSearch: (s:string) => void
    onDelete: (id:string) => void
}

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

export default Delete
