import Create from "../CrudActions/Create";
import HomeLayout from "../Layouts/HomeLayout";
import ReturnButton from "../../componets/utils/buttons/ReturnButton";
import { PROFESORFIELDS } from "../../utils/Fields";
import { useTeachers } from "../../hooks/custom/useTeachers";
import type { ProfesorConfig } from "../../interfaces/ModelsInterfaces";
import Modal from "../../componets/ui/Modals";
import { useState } from "react";
import { useForm } from "../../hooks/reducers/FormReducer";

function CreateProf(){
    //estado de modal
    const [open, setOpen] = useState<boolean>(false);

    //uso del contexto
    const context = useTeachers();

    //hook de formulario
    const {state, handleChange, resetForm } = useForm('Profesor');

    //manejo de datos
    const submit = () => {
        //obtener el modelo
        const profesor = state.data as ProfesorConfig;
        //activo por defecto
        profesor.status = "activo"
        //guardado en el contexto
        context.addTeacher(profesor).then(created => {
            if(created){
                //mostrar modal
                setOpen(true);
            }else{
                alert("no se creo");
            }
            //resetear formulario
            resetForm();
        }).catch(e => console.log(e));
    }

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
            isOpen={open}
            onClose={() => setOpen(false)}
        />
        </>
    );
}

export default CreateProf;