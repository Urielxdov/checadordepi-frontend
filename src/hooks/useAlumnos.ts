import { Alumno } from "../models/entityModels";
import { useState } from "react";

function useAlumno(){
    //estado de alumnos
    const [alumnos, setAlumnos] = useState([
        new Alumno({
            noControl: "22240341",
            nombre: "Ivan Alejandro",
            apellidos: "Cadena Lopez",
            telefono: "4631073583",
            calle: "campestre olivo #108",
            colonia: "Urbivilla del Roble",
            correo: "ivancdeno@gmail.com"
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