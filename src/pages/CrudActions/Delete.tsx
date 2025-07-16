import { type DeleteParameters } from "../../interfaces/CRUDInterfaces";
import QueryInput from "../../componets/utils/Inputs/QueryInput";
import FunctionTable from "../../componets/tables/FunctionTable";

function Delete({module, headers, entity, onSearch, onDelete}:DeleteParameters){
    //manejo de eliminado
    const drop = (e: React.MouseEvent<HTMLButtonElement>) => {
      //evitar recargo de pagina
      e.preventDefault()

      //obtener el tr sobre el que se dio click
      const tr = (e.target as HTMLElement).closest('tr')

      //si existe el tr
      if(tr){
        //obtener el id
        const id = tr.getAttribute('data-id');

        //si el id existe
        if(id){
          //pasar a onDelete
          onDelete(id)
        }
      }
    }

  
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
            <FunctionTable
              type='DELETE'
              action={drop}
              headers={headers}
              body={[entity]}
            />
          </>  
        );
    }
}

export default Delete;
