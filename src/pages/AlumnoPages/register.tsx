import { useState} from "react";
import { Alumno } from "../../models/entityModels";
import useAlumno from "../../hooks/useAlumnos";
import Form from "../../componets/forms/Form";
import Input from "../../componets/forms/Input";
import Button from "../../componets/utils/buttons/Button";
import HomeLayout from "../Layouts/HomeLayout";

function CreateAlu(){
    //hook de alumno
    const { create } = useAlumno();

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
            correo: correo.trim()
        })
        create(alumno);
        alert("alumno capturado!!!");
    }

    //retorno de vista
    return (
        <HomeLayout title="Modulo alumno">
                <h1 className="font-bold text-xl">Registrar nuevo alumno</h1>
                <Form onSubmit={handleForm}>
                    <Input
                        label='Numero de control:'
                        name='noControl'
                        type='text'
                        required={true}
                        maxLength={8}
                        minLength={8}
                        catcher={setNoControl}
                    />
                    <Input
                        label='Nombre(s):'
                        name='nombre'
                        type='text'
                        required={true}
                        catcher={setNombre}
                    />
                    <Input
                        label='Apellidos:'
                        name='apellidos'
                        type='text'
                        required={true}
                        catcher={setApellidos}
                    />
                    <Input
                        label='Telefono:'
                        name='telefono'
                        type='tel'
                        required={true}
                        maxLength={10}
                        catcher={setTelefono}
                    />
                    <Input
                        label='Calle y numero:'
                        name='calle'
                        type='text'
                        required={true}
                        catcher={setCalle}
                    />
                    <Input
                        label='Colonia:'
                        name='colonia'
                        type='text'
                        required={true}
                        catcher={setColonia}
                    />
                    <Input
                        label='Correo:'
                        name='correo'
                        type='email'
                        required={true}
                        catcher={setCorreo}
                    />
                    <Button
                        text="registrar"
                        action={() => {}}
                        submit={true}
                        styles="p-1 text-white bg-green-500 rounded-sm"
                    />
                </Form>
            </HomeLayout>
    );
}

export default CreateAlu;