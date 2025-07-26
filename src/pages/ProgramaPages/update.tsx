import Update from "../CrudActions/Update";
import { usePrograms } from "../../hooks/custom/usePrograms";
import HomeLayout from "../Layouts/HomeLayout";
import ReturnButton from "../../componets/utils/buttons/ReturnButton";
import { PROGRAMAHEADERS } from "../../utils/Headers";
import Modal from "../../componets/ui/Modals";
import { useState } from "react";
import type { BaseModel, ProgramaConfig } from "../../interfaces/ModelsInterfaces";
import PageBar from "../../componets/ui/pageBar";

function UpdateProg(){
    //estado de modal
    const [open, setOpen] = useState<boolean>(false);

    //contexto de programa
    const context = usePrograms();

    //menejo de update
    const update = (updated:BaseModel) => {
        //paso al contexto
        context.updateProgram(updated as ProgramaConfig).then(updated => {
            if(updated){
                //abrir modal
                setOpen(true);
            }else{
                alert("No se actualizo!!");
            }
        }).catch(e => console.log(e));
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
            isOpen={open}
            onClose={() => setOpen(false)}
        />
        </>
    );
}

export default UpdateProg;