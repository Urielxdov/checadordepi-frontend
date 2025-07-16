import Create from "../CrudActions/Create";
import HomeLayout from "../Layouts/HomeLayout";
import ReturnButton from "../../componets/utils/buttons/ReturnButton";
import { PROGRAMAFIELDS } from "../../utils/Fields";
import { usePrograms } from "../../hooks/custom/usePrograms";
import { parseToModel } from "../../utils/parserModels";
import type { ProgramaConfig } from "../../interfaces/ModelsInterfaces";
import Modal from "../../componets/ui/Modals";
import { useState } from "react";

function CreateProg(){
    //estado de modal
    const [open,setOpen] = useState<boolean>(false);

    //uso del contexto
    const context = usePrograms();

    //manejo de datos
    const submit = (data:FormData) => {
        //activo por defecto
        data.append("status","activo");

        //objeto convertido
        const programa = parseToModel<ProgramaConfig>(data);

        //guardado en el contexto
        context.addProgram(programa);
        setOpen(true);

    }

    //retorno de la vista
    return (
        <>
        <HomeLayout title={"Modulo curso"}>
            <Create
                module="curso"
                fields={PROGRAMAFIELDS.slice(0, PROGRAMAFIELDS.length-1)}
                onSubmit={submit}
            />
            <ReturnButton path="/curso/"/>
        </HomeLayout>
        <Modal
            title="Programa creado"
            message="el programa ha sido creado con exito"
            type="success"
            isOpen={open}
            onClose={() => setOpen(false)}
        />
        </>
    );
}

export default CreateProg;