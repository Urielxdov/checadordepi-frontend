import Delete from "../CrudActions/Delete";
import HomeLayout from "../Layouts/HomeLayout";
import ReturnButton from "../../componets/utils/buttons/ReturnButton";
import { PROGRAMAHEADERS } from "../../utils/Headers";
import { usePrograms } from "../../hooks/custom/usePrograms";

function DeleteProg(){
    //uso de contexto
    const context = usePrograms();

    //manejo de eliminado
    const drop = () => {
        //obtener el profesor
        const programa = context.state.program

        //validar que exista
        if(programa){
            context.deleteProgram(programa.id);
        }
    }

    //retorno de la vista
    return(
        <HomeLayout title="Modulo curso">
            <Delete
                module="curso"
                headers={PROGRAMAHEADERS}
                entity={context.state.program}
                onSearch={context.searchProgram}
                onDelete={drop}
            />
            <ReturnButton path="/curso/"/>
        </HomeLayout>
    );
}

export default DeleteProg;