import Update from "../CrudActions/Update";
import { useStudents } from "../../hooks/custom/useStudents";
import HomeLayout from "../Layouts/HomeLayout";
import ReturnButton from "../../componets/utils/buttons/ReturnButton";
import { ALUMNOHEADERS } from "../../utils/Headers";
import { ALUMNOFIELDS } from "../../utils/Fields";
import Modal from "../../componets/ui/Modals";
import { useState } from "react";

function UpdateAlu(){
    //estado de modal
    const [open, setOpen] = useState<boolean>(false);

    //contexto de alumno
    const context = useStudents();

    //menejo de update
    const update = (data: Array<any>) => {
        //paso al contexto
        context.updateStudent(data);
        //abrir modal
        setOpen(true);
    }

    return (
        <>
        <HomeLayout title="Modulo Alumno">
            <Update
                module='alumno'
                entity={context.state.student}
                all={context.state.students}
                headers={ALUMNOHEADERS}
                fields={ALUMNOFIELDS}
                onSearch={context.searchStudent}
                onUpdate={update}
            />
            <ReturnButton path="/alumno/"/>
        </HomeLayout>
        <Modal
            title="Alumno actualizado"
            message="los datos del alumnos se han actualizado"
            type="success"
            isOpen={open}
            onClose={() => setOpen(false)}
        />
        </>
    );
}

export default UpdateAlu;