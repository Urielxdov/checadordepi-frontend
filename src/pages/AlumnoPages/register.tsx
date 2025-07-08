import { useStudents } from "../../hooks/custom/useStudents";
import { Alumno } from "../../models/AlumnoModel";
import ReturnButton from "../../componets/utils/buttons/ReturnButton";
import Create from "../CrudActions/Create";
import HomeLayout from "../Layouts/HomeLayout";
import useForm from "../../hooks/reducers/FormReducer";
import type { AlumnoConfig } from "../../interfaces/ModelsInterfaces";

function CreateAlu(){
    //contexto de alumno
    const context = useStudents();

    //hook de formulario
    const {state, handleChange, reset} = useForm<AlumnoConfig>("Alumno");

    //funcion de manejo
    const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
         e.preventDefault();
        
         //objeto alumno
         const alumno = new Alumno({
             id: state.id.trim(),
             nombre: state.nombre.trim(),
             apellidos: state.apellidos.trim(),
             telefono: state.telefono.trim(),
             calle: state.calle.trim(),
             colonia: state.colonia.trim(),
             correo: state.correo.trim(),
             status: "Activo"
         });

         //guardar el alumno
         context.addStudent(alumno);

         //limpiar los campos
         reset();
     }

     //configuracion de campos
     const fields = [
         {
             label:"Numero de control",
             name:"id",
             type:"text",
             maxlength: 8,
             minlength: 8,
             value: state.id,
             catch: handleChange
         },
         {
             label:"Nombre(s)",
             name:"nombre",
             type:"text",
             value: state.nombre,
             catch: handleChange
         },
         {
             label:"Apellidos",
             name:"apellidos",
             type:"text",
             value: state.apellidos,
             catch: handleChange
         },
         {
             label:"Telefono",
             name:"telefono",
             type:"tel",
             maxlength: 10,
             value: state.telefono,
             catch: handleChange
         },
         {
             label:"Calle y numero",
             name:"calle",
             type:"text",
             value: state.calle,
             catch: handleChange
         },
         {
             label:"Colonia",
             name:"colonia",
             type:"text",
             value: state.colonia,
             catch: handleChange
         },
         {
             label:"Correo",
             name:"correo",
             type:"email",
             value: state.correo,
             catch: handleChange
         },
     ]

     //retorno de vista
     return (
        <HomeLayout title="Modulo Alumno">
           <Create
                module="Alumno"
                fields={fields}
                formHandler={handleForm}
            />
            <ReturnButton path="/alumno/"/>
         </HomeLayout>
     );
}

export default CreateAlu;