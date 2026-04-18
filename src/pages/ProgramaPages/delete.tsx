import Delete from "../CrudActions/Delete";
import HomeLayout from "../Layouts/HomeLayout";
import ReturnButton from "../../components/utils/buttons/ReturnButton";
import { PROGRAMAHEADERS } from "../../utils/Headers";
import { usePrograms } from "../../hooks/custom/usePrograms";
import Modal from "../../components/ui/Modals";
import { useState } from "react";
import PageBar from "../../components/ui/pageBar";
import debounce from "../../utils/Debounce";
import { useAuth } from "../../hooks/custom/useAuth";

function DeleteProg(){
    //hook de jwt
    const jwt = useAuth();

    //estado de modal
    const [openSuccess, setOpenSuccess] = useState<boolean>(false);
    const [openFail, setOpenFail] = useState<boolean>(false);

    //uso de contexto
    const context = usePrograms();

    //manejo de eliminado
    const drop = (id: string) => {
        debounce(() => {
            //paso al contexto
            context.deleteProgram(id, jwt.token).then(deleted => {
                if(deleted){
                    //abrir modal
                    setOpenSuccess(true);
                }else{
                    setOpenFail(true);
                }
            }).catch(e => console.log(e))
        },500)();
    }

    //retorno de la vista
    return(
        <>
        <HomeLayout title="Modulo programa">
            <Delete
                module="programa"
                headers={PROGRAMAHEADERS}
                entity={context.state.program}
                all={context.state.programs}
                onSearch={context.searchProgram}
                onDelete={drop}
            />
            <PageBar
                current={context.state.current_page}
                total={context.state.total}
                onChange={(page: number) => context.getPrograms(page, jwt.token)}
            />
            <ReturnButton path="/programa/"/>
        </HomeLayout>
        <Modal
            title="Programa eliminado"
            message="el programa ha sido eliminado con exito"
            type="success"
            isOpen={openSuccess}
            onClose={() => setOpenSuccess(false)}
        />
        <Modal
            title="Error al eliminar"
            message="el programa no ha sido eliminado"
            type="failure"
            isOpen={openFail}
            onClose={() => setOpenFail(false)}
        />
        </>
    );
}

export default DeleteProg;