import useAlumno from "../../hooks/useAlumnos";
import { Alumno } from "../../models/entityModels";
import HomeLayout from "../Layouts/HomeLayout";
import Table from "../../componets/tables/Table";

function IndexAlu(){
    //hook de alumnos
    const { read } = useAlumno();

    return (
        <HomeLayout title="Lista de alumnos">
            <Table
                header={[
                    "no. control",
                    "nombre(s)",
                    "apellidos",
                    "telefono",
                    "calle",
                    "colonia",
                    "correo"
                    ]}
                body={read().map((alumno:Alumno) => alumno.toArray())}
            />
        </HomeLayout>
    );
}

export default IndexAlu;