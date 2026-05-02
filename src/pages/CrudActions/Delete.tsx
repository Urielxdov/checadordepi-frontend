import { type BaseModel } from "../../interfaces/Models";
import QueryInput from "../../components/interactives/inputs/QueryInput";
import { Table } from "../../components/ui/tables/Table";

export interface DeleteParameters {
    module: string
    headers: Array<string>
    entity: BaseModel | undefined
    all: BaseModel[]
    onSearch: (s:string) => void
    onDelete: (id:string) => void
}

function Delete({module, headers, entity, all, onSearch, onDelete}:DeleteParameters){
    //vista de delete
    return(
      <>
        <QueryInput placeholder={"buscar "+module} action={onSearch}/>
        <Table
          action="delete"
          func={onDelete}
          header={headers}
          body={entity ? [entity] : all}
        />
      </>  
    );
}

export default Delete
