import Delete from "../CrudActions/Delete";
import HomeLayout from "../Layouts/HomeLayout";
import ReturnButton from "../../componets/utils/buttons/ReturnButton";
import { PROFESORHEADERS } from "../../utils/Headers";
import { useTeachers } from "../../hooks/custom/useTeachers";
import Modal from "../../componets/ui/Modals";
import { useState } from "react";
import debounce from "../../utils/Debounce";
import PageBar from "../../componets/ui/pageBar";

function DeleteProf(){
    //estado de modal
    const [openSuccess,setOpenSuccess] = useState<boolean>(false);
    const [openFail,setOpenFail] = useState<boolean>(false);

    //uso de contexto
    const context = useTeachers();

    //manejo de eliminado
    const drop = (id: string) => {
        debounce(() => {
                //pasar el id
                context.deleteTeacher(id).then( deleted => {
                if(deleted){
                    //abrir modal
                    setOpenSuccess(true);
                }else{
                    setOpenFail(true);
                }
            }).catch(e => console.log(e));
        },500)();
    }

    //retorno de la vista
    return(
        <>
        <HomeLayout title="Modulo profesor">
            <Delete
                headers={PROFESORHEADERS}
                entity={context.state.teacher}
                all={context.state.teachers}
                onSearch={context.searchTeacher}
                onDelete={drop}
            />
            <PageBar
                current={context.state.current_page}
                total={context.state.total}
                onChange={context.getTeachers}
            />
            <ReturnButton path="/profesor/"/>
        </HomeLayout>
        <Modal
            title="Profesor eliminado"
            message="el profesor ha sido eliminado con exito"
            type="success"
            isOpen={openSuccess}
            onClose={() => setOpenSuccess(false)}
        />
        <Modal
            title="Error al eliminar"
            message="el profesor no ha sido eliminado"
            type="failure"
            isOpen={openFail}
            onClose={() => setOpenFail(false)}
        />
        </>
    );
}

export default DeleteProf;