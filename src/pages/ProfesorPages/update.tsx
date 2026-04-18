import Update from "../CrudActions/Update";
import { useTeachers } from "../../hooks/custom/useTeachers";
import HomeLayout from "../../components/ui/HomeLayout";
import ReturnButton from "../../components/interactives/buttons/ReturnButton";
import { PROFESORHEADERS } from "../../utils/Headers";
import Modal from "../../components/ui/Modals";
import { useState } from "react";
import type { ProfesorModel, BaseModel } from "../../interfaces/Models";
import PageBar from "../../components/ui/pageBar";
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
            context.updateTeacher(updated as ProfesorModel, jwt.token).then(updated => {
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
        <HomeLayout title="Modulo asesor">
            <Update
                module='asesor'
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
            <ReturnButton path="/asesor/"/>
        </HomeLayout>
        <Modal
            title="Asesor actualizado"
            message="los datos del asesor han sido actualizados"
            type="success"
            isOpen={openSuccess}
            onClose={() => setOpenSuccess(false)}
        />
        <Modal
            title="Error al actualizar"
            message="el asesor no ha sido actualizado"
            type="failure"
            isOpen={openFail}
            onClose={() => setOpenFail(false)}
        />
        </>
    );
}

export default UpdateProf;