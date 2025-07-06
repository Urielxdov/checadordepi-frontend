import { useStudents } from "../../hooks/custom/useStudents";
import { Alumno } from "../../models/AlumnoModel";
import { ALUMNOHEADERS } from "../../utils/Headers";
import Index from "../CrudActions/Index";
import ReturnButton from "../../componets/utils/buttons/ReturnButton";
import HomeLayout from "../Layouts/HomeLayout";

function IndexAlu(){
    //hook de alumnos
    const context = useStudents();

    return (
        <HomeLayout title="Lista de alumnos">
            <Index
                headers={ALUMNOHEADERS}
                data={context.state.students.map((a:Alumno) => a.toArray())}
            />
            <ReturnButton path="/alumno/"/>
        </HomeLayout>
    );
}

export default IndexAlu;