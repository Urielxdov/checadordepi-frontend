import { useEffect, useState } from "react";
import { Alumno } from "../../models/entityModels";
import SearchBar from "../../componets/utils/Inputs/searchBar";
import Button from "../../componets/utils/buttons/Button";
import HomeLayout from "../Layouts/HomeLayout";
import useAlumno from "../../hooks/useAlumnos";
import Modal from "../../componets/ui/Modals";
import Form from "../../componets/forms/Form";
import Input from "../../componets/forms/Input";

function UpdateAlu(){
    //estado de modal
    const [modalFOpen, setModalFOpen] = useState(false);
    const [modalSOpen, setModalSOpen] = useState(false);

    //hook de alumno
    const { search, update } = useAlumno();

    //estados de formulario
    const [nombre,setNombre] = useState('');
    const [apellidos,setApellidos] = useState('');
    const [telefono,setTelefono] = useState('');
    const [calle,setCalle] = useState('');
    const [colonia,setColonia] = useState('');
    const [correo,setCorreo] = useState('');

    //estado para busqueda
    const [searchText, setSearch] = useState('');

    //estado de alumno
    const [alumno, setAlumno] = useState(new Alumno({
        noControl:"",
        nombre:"",
        apellidos:"",
        telefono:"",
        calle:"",
        colonia:"",
        correo:""
    }));

    //effect para montar el alumno
    useEffect(()=>{
        if(searchText!=''){
            //busqueda en el api
            const data = search(searchText);
            if(data){
                //establecer alumno
                setAlumno(data);
                setNombre(data.nombre);
                setApellidos(data.apellidos);
                setTelefono(data.telefono);
                setCalle(data.calle);
                setColonia(data.colonia);
                setCorreo(data.correo);
            }else{
                //mensaje de no encontrado
                setModalFOpen(true);
            }
        }
    },[searchText]);

    //manejo de formulario
    const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //cambios en el objeto
        const alumnoA = new Alumno({
            noControl:alumno.noControl,
            nombre:nombre,
            apellidos:apellidos,
            telefono:telefono,
            calle:calle,
            colonia:colonia,
            correo:correo
        })

        //mandar al api
        update(alumnoA);

        //resetear campos
        setNombre('');
        setApellidos('');
        setTelefono('');
        setCalle('');
        setColonia('');
        setCorreo('');

        //poner el modal
        setModalSOpen(true);

        //resetear al alumno
        setAlumno(new Alumno({
            noControl:"",
            nombre:"",
            apellidos:"",
            telefono:"",
            calle:"",
            colonia:"",
            correo:""
        }));
    }

    if(!alumno.noControl){
        return (
            <>
            <HomeLayout title="Modulo alumno">
                <h1 className="font-bold text-xl">Actualizar alumno</h1>
                <SearchBar
                    tip="numero de control"
                    onSearch={setSearch}
                />
                no hay registros aun
            </HomeLayout>
            <Modal
                isOpen={modalFOpen}
                title="no encontrado"
                message="no existe ningun alumno con esa matricula"
                type="failure"
                onClose={()=>{setModalFOpen(false)}}
            />
            </>
        );
    }else{
        return (
            <>
            <HomeLayout title="Modulo alumno">
                <h1 className="font-bold text-xl">Actualizar alumno</h1>
                <SearchBar
                    tip="numero de control"
                    onSearch={setSearch}
                />
                <div className="flex flex-col">
                    <h2 className="font-bold text-lg">Datos del alumno</h2>
                    <Form onSubmit={handleForm}>
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
                            text="actualizar"
                            action={() => {}}
                            submit={true}
                            styles="p-1 text-white bg-blue-500 rounded-sm max-w-20 mx-auto"
                        />
                    </Form>
                </div>
            </HomeLayout>
            <Modal
                isOpen={modalFOpen}
                title="no encontrado"
                message="no existe ningun alumno con esa matricula"
                type="failure"
                onClose={()=>{setModalFOpen(false)}}
            />
            <Modal
                isOpen={modalSOpen}
                title="cambios efectuados"
                message="se han actualizado los datos"
                type="success"
                onClose={()=>{setModalSOpen(false)}}
            />
            </>
        );
    }
}

export default UpdateAlu;