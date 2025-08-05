import Delete from "../CrudActions/Delete";
import HomeLayout from "../Layouts/HomeLayout";
import ReturnButton from "../../componets/utils/buttons/ReturnButton";
import { ALUMNOHEADERS } from "../../utils/Headers";
import { useStudents } from "../../hooks/custom/useStudents";
import Modal from "../../componets/ui/Modals";
import { useState } from "react";
import PageBar from "../../componets/ui/pageBar";
import debounce from "../../utils/Debounce";

function DeleteAlu(){
    //estado de modal
    const [openSuccess, setOpenSuccess] = useState<boolean>(false);
    const [openFail, setOpenFail] = useState<boolean>(false);

    //contexto de alumno
    const context = useStudents();

    //manejo de eliminacion
    const drop = (id: string) => {
        debounce(() => {
            //eliminar el alumno
            context.deleteStudent(id).then(deleted => {
                if(deleted){
                    setOpenSuccess(true);
                }else{
                    setOpenFail(true);
                }
            }).catch(e => console.log(e));
        },500)();
    }

    //retorno de componente
    return(
        <>
        <HomeLayout title="Modulo Alumno">
            <Delete 
                module="alumno"
                headers={ALUMNOHEADERS}
                entity={context.state.student}
                all={context.state.students}
                onSearch={context.searchStudent}
                onDelete={drop}
            />
            <PageBar
                current={context.state.current_page}
                total={context.state.total}
                onChange={context.getStudents}
            />
            <ReturnButton path="/alumno/"/>
        </HomeLayout>
        <Modal
            title="Alumno eliminado"
            message="el alumno ha sido eliminado con exito"
            type="success"
            isOpen={openSuccess}
            onClose={() => setOpenSuccess(false)}
        />
        <Modal
            title="Error al eliminar"
            message="el alumno no ha sido eliminado"
            type="failure"
            isOpen={openFail}
            onClose={() => setOpenFail(false)}
        />
        </>
    );
}

export default DeleteAlu;