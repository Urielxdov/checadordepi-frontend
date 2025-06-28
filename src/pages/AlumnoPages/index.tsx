import { useReducer } from "react";
import { reduceAlumno, initialState } from "../../hooks/AlumnoReducer";
import { Alumno } from "../../models/entityModels";
import Index from "../CrudActions/Index";

function IndexAlu(){
    //hook de alumnos
    const [state, dispatch] = useReducer(reduceAlumno, initialState());

    return (
        <Index
            title="Listado de alumnos"
            headers={[
                "numero de control",
                "nombre(s)",
                "apellidos",
                "telefono",
                "calle",
                "colonia",
                "correo"
            ]}
            data={state.alumnos.map((a:Alumno) => a.toArray())}
        />
    );
}

export default IndexAlu;