import Delete from "../CrudActions/Delete";
import HomeLayout from "../Layouts/HomeLayout";
import ReturnButton from "../../componets/utils/buttons/ReturnButton";
import { PROFESORHEADERS } from "../../utils/Headers";
import { useTeachers } from "../../hooks/custom/useTeachers";

function DeleteProf(){
    //uso de contexto
    const context = useTeachers();

    //manejo de eliminado
    const drop = () => {
        //obtener el profesor
        const profesor = context.state.teacher

        //validar que exista
        if(profesor){
            context.deleteTeacher(profesor.id);
        }
    }

    //retorno de la vista
    return(
        <HomeLayout title="Modulo profesor">
            <Delete
                module="profesor"
                headers={PROFESORHEADERS}
                entity={context.state.teacher}
                onSearch={context.searchTeacher}
                onDelete={drop}
            />
            <ReturnButton path="/profesor/"/>
        </HomeLayout>
    );
}

export default DeleteProf;