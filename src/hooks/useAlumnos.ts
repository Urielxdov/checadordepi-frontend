import { Alumno } from "../models/entityModels";
import { useState } from "react";

function useAlumno(){
    //estado de alumnos
    const [alumnos, setAlumnos] = useState([
        new Alumno({
            noControl: "22241102",
            nombre: "John",
            apellidos: "Doe",
            telefono: "1234567890",
            calle: "alguna calle #100",
            colonia: "Alguna colonia",
            correo: "jdoe@gmail.com"
        })
    ]);

    //funciones del crud
    const read = () => {
        return alumnos;
    }

    const search = (noControl:string) => {
        return alumnos.find((alumno) => alumno.noControl == noControl);
    }

    const create = (alumno: Alumno) => {
        setAlumnos([...alumnos, alumno]);
    }

    return { read, search, create }
}

export default useAlumno;