import { useState } from "react";
import { Alumno } from "../../models/entityModels";
import SearchBar from "../../componets/utils/Inputs/searchBar";
import HomeLayout from "../Layouts/HomeLayout";
import useAlumno from "../../hooks/useAlumnos";

function DeleteAlu(){
    //hook de alumno
    const { search } = useAlumno();

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

    if(!alumno.noControl){
        return (
            <HomeLayout title="Modulo alumno">
                <h1 className="font-bold text-xl">Eliminar alumno</h1>
                <SearchBar
                    tip="numero de control"
                    onSearch={search}
                    onResult={setAlumno}
                />
            </HomeLayout>
        );
    }else{
        return (
            <HomeLayout title="Modulo alumno">
                <h1 className="font-bold text-xl">Eliminar alumno</h1>
                <SearchBar
                    tip="numero de control"
                    onSearch={search}
                    onResult={setAlumno}
                />
                <div className="flex flex-col">
                    <h2 className="font-bold text-lg">Datos del alumno</h2>
                    <hr />
                    <b>nombre(s): </b>{alumno.nombre} <br />
                    <b>apellidos: </b>{alumno.apellidos} <br />
                    <b>telefono: </b>{alumno.telefono} <br />
                    <b>calle: </b>{alumno.calle} <br />
                    <b>colonia: </b>{alumno.colonia} <br />
                    <b>correo: </b>{alumno.correo} <br />
                </div>
            </HomeLayout>
        );
    }
}

export default DeleteAlu;