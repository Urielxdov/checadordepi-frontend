import Update from "../CrudActions/Update";
import { useStudents } from "../../hooks/custom/useStudents";
import HomeLayout from "../Layouts/HomeLayout";
import ReturnButton from "../../componets/utils/buttons/ReturnButton";
import { ALUMNOHEADERS } from "../../utils/Headers";
import { type AlumnoConfig, type BaseModel } from "../../interfaces/ModelsInterfaces";
import Modal from "../../componets/ui/Modals";
import { useState } from "react";

function UpdateAlu(){
    //estado de modal
    const [open, setOpen] = useState<boolean>(false);

    //contexto de alumno
    const context = useStudents();

    //menejo de update
    const update = (updated: BaseModel) => {
        //paso al contexto
        context.updateStudent(updated as AlumnoConfig);
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