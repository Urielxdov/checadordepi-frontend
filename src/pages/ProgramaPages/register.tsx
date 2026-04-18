import Create from "../CrudActions/Create";
import HomeLayout from "../Layouts/HomeLayout";
import ReturnButton from "../../components/utils/buttons/ReturnButton";
import { getFieldsProg } from "../../utils/Fields";
import { usePrograms } from "../../hooks/custom/usePrograms";
import { useForm } from "../../hooks/reducers/FormReducer";
import type { ProgramaModel } from "../../interfaces/Models";
import Modal from "../../components/ui/Modals";
import { useState } from "react";
import debounce from "../../utils/Debounce";
import { useAuth } from "../../hooks/custom/useAuth";

function CreateProg(){
    //hook de jwt
    const jwt = useAuth();

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
        const programa = state.data as ProgramaModel
        //activo por defecto
        programa.status = "Activo"
        //guardado en el contexto
        context.addProgram(programa, jwt.token).then(created => {
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
        <HomeLayout title={"Modulo programa"}>
            <Create
                module="programa"
                fields={getFieldsProg(state.data as ProgramaModel)}
                onSubmit={submit}
                onChange={handleChange}
            />
            <ReturnButton path="/programa/"/>
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
            message="el programa no ha sido creado"
            type="failure"
            isOpen={openFail}
            onClose={() => setOpenFail(false)}
        />
        </>
    );
}

export default CreateProg;