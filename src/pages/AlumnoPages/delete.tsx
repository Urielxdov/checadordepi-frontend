import Delete from "../CrudActions/Delete";
import HomeLayout from "../Layouts/HomeLayout";
import ReturnButton from "../../componets/utils/buttons/ReturnButton";
import { ALUMNOHEADERS } from "../../utils/Headers";
import { useStudents } from "../../hooks/custom/useStudents";
import Modal from "../../componets/ui/Modals";
import { useState } from "react";

function DeleteAlu(){
    //estado de modal
    const [open, setOpen] = useState<boolean>(false);

    //contexto de alumno
    const context = useStudents();

    //manejo de eliminacion
    const drop = (id: string) => {
        //eliminar el alumno
        context.deleteStudent(id);

        //abrir modal
        setOpen(true);
    }

    //retorno de componente
    return(
        <>
        <HomeLayout title="Modulo Alumno">
            <Delete 
                module="alumno"
                headers={ALUMNOHEADERS}
                entity={context.state.student}
                onSearch={context.searchStudent}
                onDelete={drop}
            />
            <ReturnButton path="/alumno/"/>
        </HomeLayout>
        <Modal
            title="Alumno eliminado"
            message="el alumno ha sido eliminado con exito"
            type="success"
            isOpen={open}
            onClose={() => setOpen(false)}
        />
        </>
    );
}

export default DeleteAlu;