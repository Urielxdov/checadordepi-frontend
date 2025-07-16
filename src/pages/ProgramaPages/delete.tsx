import Delete from "../CrudActions/Delete";
import HomeLayout from "../Layouts/HomeLayout";
import ReturnButton from "../../componets/utils/buttons/ReturnButton";
import { PROGRAMAHEADERS } from "../../utils/Headers";
import { usePrograms } from "../../hooks/custom/usePrograms";
import Modal from "../../componets/ui/Modals";
import { useState } from "react";

function DeleteProg(){
    //estado de modal
    const [open, setOpen] = useState<boolean>(false);

    //uso de contexto
    const context = usePrograms();

    //manejo de eliminado
    const drop = (id: string) => {
        //paso al contexto
        context.deleteProgram(parseInt(id));
        //abrir modal
        setOpen(true);
    }

    //retorno de la vista
    return(
        <>
        <HomeLayout title="Modulo curso">
            <Delete
                module="curso"
                headers={PROGRAMAHEADERS}
                entity={context.state.program}
                onSearch={(s: string) => context.searchProgram(parseInt(s))}
                onDelete={drop}
            />
            <ReturnButton path="/curso/"/>
        </HomeLayout>
        <Modal
            title="Programa eliminado"
            message="el alumno ha sido eliminado con exito"
            type="success"
            isOpen={open}
            onClose={() => setOpen(false)}
        />
        </>
    );
}

export default DeleteProg;