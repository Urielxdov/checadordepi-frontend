import Update from "../CrudActions/Update";
import { useTeachers } from "../../hooks/custom/useTeachers";
import HomeLayout from "../Layouts/HomeLayout";
import ReturnButton from "../../componets/utils/buttons/ReturnButton";
import { PROFESORHEADERS } from "../../utils/Headers";
import Modal from "../../componets/ui/Modals";
import { useState } from "react";
import type { ProfesorConfig, BaseModel } from "../../interfaces/ModelsInterfaces";
import PageBar from "../../componets/ui/pageBar";

function UpdateProf(){
    //estado de modal
    const [open,setOpen] = useState<boolean>(false);

    //contexto de profesor
    const context = useTeachers();

    //menejo de update
    const update = (updated: BaseModel) => {
        context.updateTeacher(updated as ProfesorConfig).then(updated => {
            //verificar el exito
            if(updated){
                //abrir modal
                setOpen(true);
            }else{
                alert("No se actualizo!!!");
            }
        })
    }

    return (
        <>
        <HomeLayout title="Modulo profesor">
            <Update
                module='profesor'
                entity={context.state.teacher}
                all={context.state.teachers}
                headers={PROFESORHEADERS}
                onSearch={context.searchTeacher}
                onUpdate={update}
            />
            <PageBar
                current={context.state.current_page}
                total={context.state.total}
                onChange={context.getTeachers}
            />
            <ReturnButton path="/profesor/"/>
        </HomeLayout>
        <Modal
            title="Profesor actualizado"
            message="los datos del profesor han sido actualizados"
            type="success"
            isOpen={open}
            onClose={() => setOpen(false)}
        />
        </>
    );
}

export default UpdateProf;