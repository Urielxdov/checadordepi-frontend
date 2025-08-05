import { useStudents } from "../../hooks/custom/useStudents";
import { ALUMNOHEADERS } from "../../utils/Headers";
import Index from "../CrudActions/Index";
import ReturnButton from "../../componets/utils/buttons/ReturnButton";
import HomeLayout from "../Layouts/HomeLayout";
import PageBar from "../../componets/ui/pageBar";

function IndexAlu(){
    //hook de alumnos
    const context = useStudents();

    return (
        <HomeLayout title="Lista de alumnos">
            <Index
                headers={ALUMNOHEADERS}
                data={context.state.students}
            />
            <PageBar
                current={context.state.current_page}
                total={context.state.total}
                onChange={context.getStudents}
            />
            <ReturnButton path="/alumno/"/>
        </HomeLayout>
    );
}

export default IndexAlu;