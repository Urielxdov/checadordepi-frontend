import { useStudents } from "../../hooks/custom/useStudents";
import { type AlumnoConfig } from "../../interfaces/ModelsInterfaces";
import { ALUMNOHEADERS } from "../../utils/Headers";
import Index from "../CrudActions/Index";
import ReturnButton from "../../componets/utils/buttons/ReturnButton";
import HomeLayout from "../Layouts/HomeLayout";
import { parseObjectToRow } from "../../utils/ParserObjects";

function IndexAlu(){
    //hook de alumnos
    const context = useStudents();

    return (
        <HomeLayout title="Lista de alumnos">
            <Index
                headers={ALUMNOHEADERS}
                data={context.state.students.map((a:AlumnoConfig) => parseObjectToRow(a))}
            />
            <ReturnButton path="/alumno/"/>
        </HomeLayout>
    );
}

export default IndexAlu;