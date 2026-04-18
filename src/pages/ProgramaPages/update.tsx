import Update from "../CrudActions/Update";
import { usePrograms } from "../../hooks/custom/usePrograms";
import HomeLayout from "../../components/ui/HomeLayout";
import ReturnButton from "../../components/interactives/buttons/ReturnButton";
import { PROGRAMAHEADERS } from "../../utils/Headers";
import Modal from "../../components/ui/Modals";
import { useState } from "react";
import type { BaseModel, ProgramaModel } from "../../interfaces/Models";
import PageBar from "../../components/ui/pageBar";
import debounce from "../../utils/Debounce";
import { useAuth } from "../../hooks/custom/useAuth";

function UpdateProg(){
    //hook de jwt
    const jwt = useAuth();

    //estado de modal
    const [openSuccess, setOpenSuccess] = useState<boolean>(false);
    const [openFail, setOpenFail] = useState<boolean>(false);

    //contexto de programa
    const context = usePrograms();

    //menejo de update
    const update = (updated:BaseModel) => {
        debounce(() => {
            //cambio
            if(updated.status == "Permiso"){ updated.status = "Inactivo" }
            //paso al contexto
            context.updateProgram(updated as ProgramaModel, jwt.token).then(updated => {
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
        <HomeLayout title="Modulo programa">
            <Update
                module='programa'
                entity={context.state.program}
                all={context.state.programs}
                headers={PROGRAMAHEADERS}
                onSearch={context.searchProgram}
                onUpdate={update}
            />
            <PageBar
                current={context.state.current_page}
                total={context.state.total}
                onChange={(page: number) => context.getPrograms(page, jwt.token)}
            />
            <ReturnButton path="/programa/"/>
        </HomeLayout>
        <Modal
            title="Programa actualizado"
            message="los datos del programa han sido actualizados"
            type="success"
            isOpen={openSuccess}
            onClose={() => setOpenSuccess(false)}
        />
        <Modal
            title="Error al actualizar"
            message="el programa no ha sido actualizado"
            type="failure"
            isOpen={openFail}
            onClose={() => setOpenFail(false)}
        />
        </>
    );
}

export default UpdateProg;