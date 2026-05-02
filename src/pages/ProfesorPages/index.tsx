import { useTeachers } from "../../hooks/custom/useTeachers";
import { PROFESORHEADERS } from "../../utils/Headers";
import HomeLayout from "../../components/ui/HomeLayout";
import ReturnButton from "../../components/interactives/buttons/ReturnButton";
import { useAuth } from "../../hooks/custom/useAuth";
import Index from "../CrudActions/Index";
import PageBar from "../../components/ui/pageBar";

function IndexProf(){
    //hook de jwt
    const jwt = useAuth();

    //contexto
    const context = useTeachers();

    //vista de la pagina
    return (
        <HomeLayout title="Lista de asesores">
            <Index 
                headers={PROFESORHEADERS}
                body={context.state.teachers}
                onSearch={context.searchTeacher}
                entity={context.state.teacher}
            />
            <PageBar
                current={context.state.current_page}
                total={context.state.total}
                onChange={(page: number) => context.getTeachers(page, jwt.token)}
            />
            <ReturnButton path="/asesor/"/>
        </HomeLayout>
    );
}

export default IndexProf;