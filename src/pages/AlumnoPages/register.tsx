import { useStudents } from "../../hooks/custom/useStudents";
import ReturnButton from "../../componets/utils/buttons/ReturnButton";
import Create from "../CrudActions/Create";
import HomeLayout from "../Layouts/HomeLayout";
import { ALUMNOFIELDS } from "../../utils/Fields";
import type { AlumnoConfig } from "../../interfaces/ModelsInterfaces";
import { useForm } from "../../hooks/reducers/FormReducer";
import Modal from "../../componets/ui/Modals";
import { useState } from "react";

function CreateAlu(){
   //estado para modal
   const [open, setOpen] = useState<boolean>(false);

   //contexto de alumno
   const context = useStudents();

   //hook de formulario
   const { state, handleChange, resetForm } = useForm('Alumno');

   //funcion de manejo
   const onSubmit = () => {
      //obtener el modelo
      const alumno = state.data as AlumnoConfig
      //activo por defecto
      alumno.status = "activo"
      //gurdado en el contexto
      context.addStudent(alumno);
      resetForm();
      setOpen(true);
   }

     //retorno de vista
     return (
        <>
        <HomeLayout title="Modulo Alumno">
           <Create
                module="Alumno"
                fields={ALUMNOFIELDS.slice(0,ALUMNOFIELDS.length-1)}
                onSubmit={onSubmit}
                onChange={handleChange}
            />
            <ReturnButton path="/alumno/"/>
         </HomeLayout>
         <Modal
            title="Alumno creado"
            message="el alumno ha sido creado con exito"
            type="success"
            isOpen={open}
            onClose={() => setOpen(false)}
        />
        </>
     );
}

export default CreateAlu;