import { useStudents } from "../../hooks/custom/useStudents";
import { ALUMNOHEADERS } from "../../utils/Headers";
import ReturnButton from "../../components/interactives/buttons/ReturnButton";
import HomeLayout from "../../components/ui/HomeLayout";
import { useAuth } from "../../hooks/custom/useAuth";
import Index from "../CrudActions/Index";
import PageBar from "../../components/ui/pageBar";

function IndexAlu () {
    //hook de jwt
    const jwt = useAuth();

    //hook de alumnos
    const context = useStudents();

    if (!context) 
        return (
            <HomeLayout title="Lista de alumnos">
                <div>Error: contexto no disponible</div>
            </HomeLayout>
        );

    return (
        <HomeLayout title="Lista de alumnos">
            <Index 
                headers={ALUMNOHEADERS}
                body={context.state.students}
                onSearch={s => context.searchStudent(s)}
                entity={context.state.student}
            />
            <PageBar
                current={context.state.current_page}
                total={context.state.total}
                onChange={(page: number) => context.getStudents(page, jwt.token)}
            />
            <ReturnButton path="/alumno/"/>
        </HomeLayout>
    );
}

export default IndexAlu
