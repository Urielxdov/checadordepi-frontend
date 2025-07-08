import { useEffect, useState } from "react";
import Update from "../CrudActions/Update";
import { Alumno } from "../../models/AlumnoModel";
import { useStudents } from "../../hooks/custom/useStudents";
import HomeLayout from "../Layouts/HomeLayout";
import ReturnButton from "../../componets/utils/buttons/ReturnButton";
import useForm from "../../hooks/reducers/FormReducer";
import type { AlumnoConfig } from "../../interfaces/ModelsInterfaces";

function UpdateAlu(){
    //contexto de alumno
    const context = useStudents();

    //hook de formulario
    const {state, handleChange, reset, setData} = useForm<AlumnoConfig>("Alumno");

    //campos del formulario
    const fields = [
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
         {
             label:"Estatus",
             name:"status",
             type:"text",
             value: state.status,
             catch: handleChange
         }
    ];

    //menejo de update
    const update = (e: React.FormEvent<HTMLFormElement>) => {
        //previene el recargo de la pagina
        e.preventDefault();

        //actualizar
        const alumno = new Alumno({
            //si existe cuando se crea pero para que ts no llore
            id: context.state.student ? context.state.student.id: "",
            nombre: state.nombre,
            apellidos: state.apellidos,
            telefono: state.telefono,
            calle: state.calle,
            colonia: state.colonia,
            correo: state.correo,
            status: state.status
        });
        context.updateStudent(alumno);

        //lipieza de campos
        reset();
    }

    useEffect(()=>{
        const student = context.state.student;

        if(student){
            setData(student);
        }
    },[context.state.student]);

    return (
        <HomeLayout title="Modulo Alumno">
            <Update
                module='alumno'
                entity={context.state.student}
                fields={fields}
                onSearch={context.searchStudent}
                onUpdate={update}
            />
            <ReturnButton path="/alumno/"/>
        </HomeLayout>
    );
}

export default UpdateAlu;