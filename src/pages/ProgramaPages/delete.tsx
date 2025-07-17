import Delete from "../CrudActions/Delete";
import HomeLayout from "../Layouts/HomeLayout";
import ReturnButton from "../../componets/utils/buttons/ReturnButton";
import { PROGRAMAHEADERS } from "../../utils/Headers";
import { usePrograms } from "../../hooks/custom/usePrograms";

function DeleteProg(){
    //uso de contexto
    const context = usePrograms();

    //retorno de la vista
    return(
        <HomeLayout title="Modulo curso">
            <Delete
                entity="curso"
                headers={PROGRAMAHEADERS}
                body={context.state.programs}
                onSearch={(s: string) => context.searchProgram(parseInt(s))}
                onDelete={(id: string) => context.deleteProgram(parseInt(id))}
            />
            <ReturnButton path="/curso/"/>
        </HomeLayout>
    );
}

export default DeleteProg;