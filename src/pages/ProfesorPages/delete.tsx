import Delete from "../CrudActions/Delete";
import HomeLayout from "../Layouts/HomeLayout";
import ReturnButton from "../../componets/utils/buttons/ReturnButton";
import { PROFESORHEADERS } from "../../utils/Headers";
import { useTeachers } from "../../hooks/custom/useTeachers";

function DeleteProf(){
    //uso de contexto
    const context = useTeachers();

    //retorno de la vista
    return(
        <HomeLayout title="Modulo profesor">
            <Delete
                headers={PROFESORHEADERS}
                entity="profesor"
                body={context.state.teachers}
                onSearch={context.searchTeacher}
                onDelete={context.deleteTeacher}
            />
            <ReturnButton path="/profesor/"/>
        </HomeLayout>
    );
}

export default DeleteProf;