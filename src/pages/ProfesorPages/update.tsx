import Update from "../CrudActions/Update";
import { useTeachers } from "../../hooks/custom/useTeachers";
import HomeLayout from "../Layouts/HomeLayout";
import ReturnButton from "../../componets/utils/buttons/ReturnButton";
import { PROFESORHEADERS } from "../../utils/Headers";
import Modal from "../../componets/ui/Modals";
import { useState } from "react";
import type { ProfesorConfig, BaseModel } from "../../interfaces/ModelsInterfaces";
import PageBar from "../../componets/ui/pageBar";
import debounce from "../../utils/Debounce";
import { useAuth } from "../../hooks/custom/useAuth";

function UpdateProf(){
    //hook de jwt
    const jwt = useAuth();

    //estado de modal
    const [openSuccess,setOpenSuccess] = useState<boolean>(false);
    const [openFail,setOpenFail] = useState<boolean>(false);

    //contexto de profesor
    const context = useTeachers();

    //menejo de update
    const update = (updated: BaseModel) => {
        debounce(() => {
            context.updateTeacher(updated as ProfesorConfig, jwt.token).then(updated => {
                //verificar el exito
                if(updated){
                    //abrir modal
                    setOpenSuccess(true);
                }else{
                    setOpenFail(true);
                }
            }).catch(e => console.log(e));
        },500)();
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
                onChange={(page: number) => context.getTeachers(page, jwt.token)}
            />
            <ReturnButton path="/profesor/"/>
        </HomeLayout>
        <Modal
            title="Profesor actualizado"
            message="los datos del profesor han sido actualizados"
            type="success"
            isOpen={openSuccess}
            onClose={() => setOpenSuccess(false)}
        />
        <Modal
            title="Error al actualizar"
            message="el profesor no ha sido actualizado"
            type="failure"
            isOpen={openFail}
            onClose={() => setOpenFail(false)}
        />
        </>
    );
}

export default UpdateProf;