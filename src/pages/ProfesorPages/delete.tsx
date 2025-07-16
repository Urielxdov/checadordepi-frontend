import Delete from "../CrudActions/Delete";
import HomeLayout from "../Layouts/HomeLayout";
import ReturnButton from "../../componets/utils/buttons/ReturnButton";
import { PROFESORHEADERS } from "../../utils/Headers";
import { useTeachers } from "../../hooks/custom/useTeachers";
import Modal from "../../componets/ui/Modals";
import { useState } from "react";

function DeleteProf(){
    //estado de modal
    const [open,setOpen] = useState<boolean>(false);

    //uso de contexto
    const context = useTeachers();

    //manejo de eliminado
    const drop = (id: string) => { 
        //pasar el id
        context.deleteTeacher(id);
        //abrir modal
        setOpen(true);
    }

    //retorno de la vista
    return(
        <>
        <HomeLayout title="Modulo profesor">
            <Delete
                module="profesor"
                headers={PROFESORHEADERS}
                entity={context.state.teacher}
                all={context.state.teachers}
                onSearch={context.searchTeacher}
                onDelete={drop}
            />
            <ReturnButton path="/profesor/"/>
        </HomeLayout>
        <Modal
            title="Profesor eliminado"
            message="el profesor ha sido eliminado con exito"
            type="success"
            isOpen={open}
            onClose={() => setOpen(false)}
        />
        </>
    );
}

export default DeleteProf;