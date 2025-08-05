import Create from "../CrudActions/Create";
import HomeLayout from "../Layouts/HomeLayout";
import ReturnButton from "../../componets/utils/buttons/ReturnButton";
import { getFieldsProg } from "../../utils/Fields";
import { usePrograms } from "../../hooks/custom/usePrograms";
import { useForm } from "../../hooks/reducers/FormReducer";
import type { ProgramaConfig } from "../../interfaces/ModelsInterfaces";
import Modal from "../../componets/ui/Modals";
import { useState } from "react";
import debounce from "../../utils/Debounce";

function CreateProg(){
    //estado de modal
    const [openSuccess,setOpenSuccess] = useState<boolean>(false);
    const [openFail,setOpenFail] = useState<boolean>(false);

    //uso del contexto
    const context = usePrograms();

    //hook de formulario
    const { state, handleChange, resetForm } = useForm('Programa');

    //manejo de datos
    const submit = debounce(() => {
        //obtener el modelo
        const programa = state.data as ProgramaConfig
        //activo por defecto
        programa.status = "activo"
        //guardado en el contexto
        context.addProgram(programa).then(created => {
            if(created){
                //mostrar el modal
                setOpenSuccess(true);
            }else{
                setOpenFail(true);
            }
            resetForm();
        }).catch(e => console.log(e));
    },500);

    //retorno de la vista
    return (
        <>
        <HomeLayout title={"Modulo curso"}>
            <Create
                module="curso"
                fields={getFieldsProg(state.data as ProgramaConfig)}
                onSubmit={submit}
                onChange={handleChange}
            />
            <ReturnButton path="/curso/"/>
        </HomeLayout>
        <Modal
            title="Programa creado"
            message="el programa ha sido creado con exito"
            type="success"
            isOpen={openSuccess}
            onClose={() => setOpenSuccess(false)}
        />
        <Modal
            title="Error al crear"
            message="el curso no ha sido creado"
            type="failure"
            isOpen={openFail}
            onClose={() => setOpenFail(false)}
        />
        </>
    );
}

export default CreateProg;