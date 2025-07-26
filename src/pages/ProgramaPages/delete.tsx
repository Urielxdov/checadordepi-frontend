import Delete from "../CrudActions/Delete";
import HomeLayout from "../Layouts/HomeLayout";
import ReturnButton from "../../componets/utils/buttons/ReturnButton";
import { PROGRAMAHEADERS } from "../../utils/Headers";
import { usePrograms } from "../../hooks/custom/usePrograms";
import Modal from "../../componets/ui/Modals";
import { useState } from "react";
import PageBar from "../../componets/ui/pageBar";

function DeleteProg(){
    //estado de modal
    const [open, setOpen] = useState<boolean>(false);

    //uso de contexto
    const context = usePrograms();

    //manejo de eliminado
    const drop = (id: string) => {
        //paso al contexto
        context.deleteProgram(id).then(deleted => {
            if(deleted){
                //abrir modal
                setOpen(true);
            }else{
                alert("No se elimino!!!");
            }
        }).catch(e => console.log(e));
    }

    //retorno de la vista
    return(
        <>
        <HomeLayout title="Modulo curso">
            <Delete
                module="curso"
                headers={PROGRAMAHEADERS}
                entity={context.state.program}
                all={context.state.programs}
                onSearch={context.searchProgram}
                onDelete={drop}
            />
            <PageBar
                current={context.state.current_page}
                total={context.state.total}
                onChange={context.getPrograms}
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