import { useEffect, useState } from "react";
import Update from "../CrudActions/Update";
import { Alumno } from "../../models/entityModels";
import { useStudents } from "../../hooks/custom/useStudents";
import HomeLayout from "../Layouts/HomeLayout";
import ReturnButton from "../../componets/utils/buttons/ReturnButton";

function UpdateAlu(){
    //contexto de alumno
    const context = useStudents();

    //estados del formulario
    const [nombre, setNombre] = useState('');
    const [apellidos,setApellidos] = useState('');
    const [telefono,setTelefono] = useState('');
    const [calle,setCalle] = useState('');
    const [colonia,setColonia] = useState('');
    const [correo,setCorreo] = useState('');
    const [status,setStatus] = useState('');

    //campos del formulario
    const fields = [
        {
             label:"Nombre(s)",
             name:"nombre",
             type:"text",
             value: nombre,
             catch: setNombre
         },
         {
             label:"Apellidos",
             name:"apellidos",
             type:"text",
             value: apellidos,
             catch: setApellidos
         },
         {
             label:"Telefono",
             name:"telefono",
             type:"tel",
             maxlength: 10,
             value: telefono,
             catch: setTelefono
         },
         {
             label:"Calle y numero",
             name:"calle",
             type:"text",
             value: calle,
             catch: setCalle
         },
         {
             label:"Colonia",
             name:"colonia",
             type:"text",
             value: colonia,
             catch: setColonia
         },
         {
             label:"Correo",
             name:"correo",
             type:"email",
             value: correo,
             catch: setCorreo
         },
         {
             label:"Estatus",
             name:"status",
             type:"text",
             value: status,
             catch: setStatus
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
            nombre: nombre,
            apellidos: apellidos,
            telefono: telefono,
            calle: calle,
            colonia: colonia,
            correo: correo,
            status: status
        });
        context.updateStudent(alumno);

        //lipieza de campos
        setNombre('');
        setApellidos('');
        setTelefono('');
        setCalle('');
        setColonia('');
        setCorreo('');
        setStatus('');
    }

    useEffect(()=>{
        const student = context.state.student;

        if(student){
            setNombre(student.nombre);
            setApellidos(student.apellidos);
            setTelefono(student.telefono);
            setCalle(student.calle);
            setColonia(student.colonia);
            setCorreo(student.correo);
            setStatus(student.status);
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