import Update from "../CrudActions/Update";
import { usePrograms } from "../../hooks/custom/usePrograms";
import HomeLayout from "../Layouts/HomeLayout";
import ReturnButton from "../../componets/utils/buttons/ReturnButton";
import { PROGRAMAHEADERS } from "../../utils/Headers";
import Modal from "../../componets/ui/Modals";
import { useState } from "react";

function UpdateProg(){
    //estado de modal
    const [open, setOpen] = useState<boolean>(false);

    //contexto de programa
    const context = usePrograms();

    //menejo de update
    const update = (data: Array<any>) => {
        //paso al contexto
        context.updateProgram(data);
        //abrir modal
        setOpen(true);
    }

    return (
        <>
        <HomeLayout title="Modulo curso">
            <Update
                module='curso'
                entity={context.state.program}
                headers={PROGRAMAHEADERS}
                onSearch={(s: string) => context.searchProgram(parseInt(s))}
                onUpdate={update}
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