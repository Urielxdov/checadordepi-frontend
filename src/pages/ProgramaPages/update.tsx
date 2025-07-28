import Update from "../CrudActions/Update";
import { usePrograms } from "../../hooks/custom/usePrograms";
import HomeLayout from "../Layouts/HomeLayout";
import ReturnButton from "../../componets/utils/buttons/ReturnButton";
import { PROGRAMAHEADERS } from "../../utils/Headers";
import Modal from "../../componets/ui/Modals";
import { useState } from "react";
import type { BaseModel, ProgramaConfig } from "../../interfaces/ModelsInterfaces";
import PageBar from "../../componets/ui/pageBar";
import debounce from "../../utils/Debounce";

function UpdateProg(){
    //estado de modal
    const [openSuccess, setOpenSuccess] = useState<boolean>(false);
    const [openFail, setOpenFail] = useState<boolean>(false);

    //contexto de programa
    const context = usePrograms();

    //menejo de update
    const update = (updated:BaseModel) => {
        debounce(() => {
            //paso al contexto
            context.updateProgram(updated as ProgramaConfig).then(updated => {
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
        <HomeLayout title="Modulo curso">
            <Update
                module='curso'
                entity={context.state.program}
                all={context.state.programs}
                headers={PROGRAMAHEADERS}
                onSearch={context.searchProgram}
                onUpdate={update}
            />
            <PageBar
                current={context.state.current_page}
                total={context.state.total}
                onChange={context.getPrograms}
            />
            <ReturnButton path="/curso/"/>
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
            message="el curso no ha sido actualizado"
            type="failure"
            isOpen={openFail}
            onClose={() => setOpenFail(false)}
        />
        </>
    );
}

export default UpdateProg;