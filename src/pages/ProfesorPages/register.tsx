import Create from "../CrudActions/Create";
import HomeLayout from "../Layouts/HomeLayout";
import ReturnButton from "../../components/utils/buttons/ReturnButton";
import { getFieldsProf } from "../../utils/Fields";
import { useTeachers } from "../../hooks/custom/useTeachers";
import type { ProfesorConfig } from "../../interfaces/ModelsInterfaces";
import Modal from "../../components/ui/Modals";
import { useState } from "react";
import { useForm } from "../../hooks/reducers/FormReducer";
import debounce from "../../utils/Debounce";
import { useAuth } from "../../hooks/custom/useAuth";

function CreateProf(){
    //hook de jwt
    const jwt = useAuth();

    //estado de modal
    const [openSuccess, setOpenSuccess] = useState<boolean>(false);
    const [openFail, setOpenFail] = useState<boolean>(false);

    //uso del contexto
    const context = useTeachers();

    //hook de formulario
    const {state, handleChange, resetForm } = useForm('Profesor');

    //manejo de datos
    const submit = debounce(() => {
        //obtener el modelo
        const profesor = state.data as ProfesorConfig;
        //activo por defecto
        profesor.status = "Activo"
        //guardado en el contexto
        context.addTeacher(profesor, jwt.token).then(created => {
            if(created){
                //mostrar modal
                setOpenSuccess(true);
            }else{
                setOpenFail(true);
            }
            //resetear formulario
            resetForm();
        }).catch(e => console.log(e));
    },500);

    //retorno de la vista
    return (
        <>
        <HomeLayout title={"Modulo profesor"}>
            <Create
                module="profesor"
                fields={getFieldsProf(state.data as ProfesorConfig)}
                onSubmit={submit}
                onChange={handleChange}
            />
            <ReturnButton path="/profesor/"/>
        </HomeLayout>
        <Modal
            title="Profesor creado"
            message="el profesor ha sido creado con exito"
            type="success"
            isOpen={openSuccess}
            onClose={() => setOpenSuccess(false)}
        />
        <Modal
            title="Error al crear"
            message="el profesor no ha sido creado"
            type="failure"
            isOpen={openFail}
            onClose={() => setOpenFail(false)}
        />
        </>
    );
}

export default CreateProf;