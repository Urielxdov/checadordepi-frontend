import Create from "../CrudActions/Create";
import HomeLayout from "../Layouts/HomeLayout";
import ReturnButton from "../../componets/utils/buttons/ReturnButton";
import { PROFESORFIELDS } from "../../utils/Fields";
import { useTeachers } from "../../hooks/custom/useTeachers";
import { parseToModel } from "../../utils/parserModels";
import type { ProfesorConfig } from "../../interfaces/ModelsInterfaces";
import Modal from "../../componets/ui/Modals";
import { useState } from "react";

function CreateProf(){
    //estado de modal
    const [open, setOpen] = useState<boolean>(false);


    //uso del contexto
    const context = useTeachers();

    //manejo de datos
    const submit = (data:FormData) => {
        //activo por defecto
        data.append("status","activo");

        //objeto convertido
        const profesor = parseToModel<ProfesorConfig>(data);

        //guardado en el contexto
        context.addTeacher(profesor);
        setOpen(true);
    }

    //retorno de la vista
    return (
        <>
        <HomeLayout title={"Modulo profesor"}>
            <Create
                module="profesor"
                fields={PROFESORFIELDS.slice(0, PROFESORFIELDS.length-1)}
                onSubmit={submit}
            />
            <ReturnButton path="/profesor/"/>
        </HomeLayout>
        <Modal
            title="Profesor creado"
            message="el profesor ha sido creado con exito"
            type="success"
            isOpen={open}
            onClose={() => setOpen(false)}
        />
        </>
    );
}

export default CreateProf;