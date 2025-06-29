import { useReducer, useState} from "react";
import { Alumno } from "../../models/entityModels";
import { reduceAlumno, initialState } from "../../hooks/AlumnoReducer";
import Create from "../CrudActions/Create";

function CreateAlu(){
    //hook de alumno
    const [state, disptach] = useReducer(reduceAlumno, initialState());

    //valores de formulario
    const [noControl, setNoControl] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [telefono, setTelefono] = useState('');
    const [calle, setCalle] = useState('');
    const [colonia, setColonia] = useState('');
    const [correo, setCorreo] = useState('');

    //funcion de manejo
    const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        //objeto alumno
        const alumno = new Alumno({
            noControl: noControl.trim(),
            nombre: nombre.trim(),
            apellidos: apellidos.trim(),
            telefono: telefono.trim(),
            calle: calle.trim(),
            colonia: colonia.trim(),
            correo: correo.trim(),
            status: "Activo"
        })

        //guardar el alumno
        disptach({type:"create", alumno: alumno});

        //limpiar los campos
        setNoControl("");
        setNombre("");
        setApellidos("");
        setTelefono("");
        setCalle("");
        setColonia("");
        setCorreo("");
    }

    //configuracion de campos
    const fields = [
        {
            label:"Numero de control",
            name:"noControl",
            type:"text",
            maxlength: 8,
            minlength: 8,
            value: noControl,
            catch: setNoControl
        },
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
    ]

    //configuracion de modal de exito
    const modalConf = {
        title: "Alumno creado",
        message: "El alumno ha sido creado con exito",
        type:"success"
    }

    //retorno de vista
    return (
        <Create
            title="Modulo alumno"
            entity="Alumno"
            fields={fields}
            formHandler={handleForm}
            modalConf={modalConf}
        />
    );
}

export default CreateAlu;