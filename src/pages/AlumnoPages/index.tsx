import { useStudents } from "../../hooks/custom/useStudents";
import { ALUMNOHEADERS } from "../../utils/Headers";
import Index from "../CrudActions/Index";
import ReturnButton from "../../components/utils/buttons/ReturnButton";
import HomeLayout from "../Layouts/HomeLayout";
import PageBar from "../../components/ui/pageBar";
import { useAuth } from "../../hooks/custom/useAuth";

function IndexAlu () {
    //hook de jwt
    const jwt = useAuth();

    //hook de alumnos
    const context = useStudents();

    if (!context) return <div>Error: contexto no disponible</div>

        return (
            <HomeLayout title="Lista de alumnos">
                <Index
                    headers={ALUMNOHEADERS}
                    data={context.state.students}
                />
                <PageBar
                    current={context.state.current_page}
                    total={context.state.total}
                    onChange={(page:number) => context.getStudents(page, jwt.token as string)}
                />
                <ReturnButton path="/alumno/"/>
            </HomeLayout>
        );
}

export default IndexAlu
