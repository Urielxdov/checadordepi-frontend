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
                    "Numero de Control",
                    "Nombre(s)",
                    "Apellidos",
                    "Telefono",
                    "Calle",
                    "Colonia",
                    "Correo"
                    ]}
                body={read().map((alumno:Alumno) => alumno.toArray())}
            />
        </HomeLayout>
    );
}

export default IndexAlu;