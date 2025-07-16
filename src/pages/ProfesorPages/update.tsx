import Update from "../CrudActions/Update";
import { useTeachers } from "../../hooks/custom/useTeachers";
import HomeLayout from "../Layouts/HomeLayout";
import ReturnButton from "../../componets/utils/buttons/ReturnButton";
import { PROFESORHEADERS } from "../../utils/Headers";
import Modal from "../../componets/ui/Modals";
import { useState } from "react";

function UpdateProf(){
    //estado de modal
    const [open,setOpen] = useState<boolean>(false);

    //contexto de profesor
    const context = useTeachers();

    //menejo de update
    const update = (data: Array<any>) => {
        //paso al contexto
        context.updateTeacher(data);
        //abrir modal
        setOpen(true);
    }

    return (
        <>
        <HomeLayout title="Modulo profesor">
            <Update
                module='profesor'
                entity={context.state.teacher}
                headers={PROFESORHEADERS}
                onSearch={context.searchTeacher}
                onUpdate={update}
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