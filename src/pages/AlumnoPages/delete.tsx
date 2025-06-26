import { useEffect, useState } from "react";
import { Alumno } from "../../models/entityModels";
import SearchBar from "../../componets/utils/Inputs/searchBar";
import Button from "../../componets/utils/buttons/Button";
import HomeLayout from "../Layouts/HomeLayout";
import useAlumno from "../../hooks/useAlumnos";
import Modal from "../../componets/ui/Modals";
import Table from "../../componets/tables/Table";

function DeleteAlu(){
    //estado de modal
    const [modalOpen, setModalOpen] = useState(false);

    //hook de alumno
    const { search, drop } = useAlumno();

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
            }else{
                //mensaje de no encontrado
                setModalOpen(true);
            }
        }
    },[searchText]);

    if(!alumno.noControl){
        return (
            <>
            <HomeLayout title="Modulo alumno">
                <h1 className="font-bold text-xl">Eliminar alumno</h1>
                <SearchBar
                    tip="numero de control"
                    onSearch={setSearch}
                />
                no hay registros aun
            </HomeLayout>
            <Modal
                isOpen={modalOpen}
                title="no encontrado"
                message="no existe ningun alumno con esa matricula"
                type="failure"
                onClose={()=>{setModalOpen(false)}}
            />
            </>
        );
    }else{
        return (
            <>
            <HomeLayout title="Modulo alumno">
                <h1 className="font-bold text-xl">Eliminar alumno</h1>
                <SearchBar
                    tip="numero de control"
                    onSearch={setSearch}
                />
                <div className="flex flex-col">
                    <h2 className="font-bold text-lg">Datos del alumno</h2>
                    <Table
                        header={[
                        "Numero de Control",
                        "Nombre(s)",
                        "Apellidos",
                        "Telefono",
                        "Calle",
                        "Colonia",
                        "Correo"
                        ]}
                        body={[alumno.toArray()]}
                    />
                </div>
                <Button
                    text="eliminar"
                    action={() => {
                        //eliminar alumno
                        drop(alumno.noControl);
                        setAlumno(new Alumno({
                                    noControl:"",
                                    nombre:"",
                                    apellidos:"",
                                    telefono:"",
                                    calle:"",
                                    colonia:"",
                                    correo:""
                                }));
                    }}
                    submit={false}
                    styles="p-1 text-white bg-red-500 rounded-sm max-w-20 mx-auto"
                />
            </HomeLayout>
            <Modal
                isOpen={modalOpen}
                title="no encontrado"
                message="no existe ningun alumno con esa matricula"
                type="failure"
                onClose={()=>{setModalOpen(false)}}
            />
            </>
        );
    }
}

export default DeleteAlu;