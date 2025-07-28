import Create from "../CrudActions/Create";
import HomeLayout from "../Layouts/HomeLayout";
import ReturnButton from "../../componets/utils/buttons/ReturnButton";
import { PROFESORFIELDS } from "../../utils/Fields";
import { useTeachers } from "../../hooks/custom/useTeachers";
import type { ProfesorConfig } from "../../interfaces/ModelsInterfaces";
import Modal from "../../componets/ui/Modals";
import { useState } from "react";
import { useForm } from "../../hooks/reducers/FormReducer";
import debounce from "../../utils/Debounce";

function CreateProf(){
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
        context.addTeacher(profesor).then(created => {
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
                fields={PROFESORFIELDS}
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