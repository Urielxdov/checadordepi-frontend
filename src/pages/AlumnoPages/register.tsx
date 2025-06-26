import { useState} from "react";
import { Alumno } from "../../models/entityModels";
import useAlumno from "../../hooks/useAlumnos";
import Form from "../../componets/forms/Form";
import Input from "../../componets/forms/Input";
import Button from "../../componets/utils/buttons/Button";
import HomeLayout from "../Layouts/HomeLayout";
import Modal from "../../componets/ui/Modals";

function CreateAlu(){
    //hook de modal
    const [modalOpen, setModalOpen] = useState(false);

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

        //guardar el alumno
        create(alumno);

        //limpiar los campos
        setNoControl("");
        setNombre("");
        setApellidos("");
        setCalle("");
        setColonia("");
        setCorreo("");

        //abrir el modal
        setModalOpen(true);
    }

    //retorno de vista
    return (
        <>
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
                        value={noControl}
                        catcher={setNoControl}
                    />
                    <Input
                        label='Nombre(s):'
                        name='nombre'
                        type='text'
                        required={true}
                        value={nombre}
                        catcher={setNombre}
                    />
                    <Input
                        label='Apellidos:'
                        name='apellidos'
                        type='text'
                        required={true}
                        value={apellidos}
                        catcher={setApellidos}
                    />
                    <Input
                        label='Telefono:'
                        name='telefono'
                        type='tel'
                        required={true}
                        maxLength={10}
                        value={telefono}
                        catcher={setTelefono}
                    />
                    <Input
                        label='Calle y numero:'
                        name='calle'
                        type='text'
                        required={true}
                        value={calle}
                        catcher={setCalle}
                    />
                    <Input
                        label='Colonia:'
                        name='colonia'
                        type='text'
                        required={true}
                        value={colonia}
                        catcher={setColonia}
                    />
                    <Input
                        label='Correo:'
                        name='correo'
                        type='email'
                        required={true}
                        value={correo}
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
            <Modal
                isOpen={modalOpen}
                title="alumno creado"
                message="El alumno ha sido creado con exito"
                type="success"
                onClose={() => setModalOpen(false)}
            />
        </>
    );
}

export default CreateAlu;