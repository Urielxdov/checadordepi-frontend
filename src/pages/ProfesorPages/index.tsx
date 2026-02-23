import { useTeachers } from "../../hooks/custom/useTeachers";
import { PROFESORHEADERS } from "../../utils/Headers";
import Index from "../CrudActions/Index";
import HomeLayout from "../Layouts/HomeLayout";
import ReturnButton from "../../componets/utils/buttons/ReturnButton";
import PageBar from "../../componets/ui/pageBar";
import { useAuth } from "../../hooks/custom/useAuth";

function IndexProf(){
    //hook de jwt
    const jwt = useAuth();

    //contexto
    const context = useTeachers();

    //vista de la pagina
    return (
        <HomeLayout title="Lista de profesores">
            <Index 
                headers={PROFESORHEADERS}
                data={context.state.teachers}
            />
            <PageBar
                current={context.state.current_page}
                total={context.state.total}
                onChange={(page: number) => context.getTeachers(page, jwt.token)}
            />
            <ReturnButton path="/profesor/"/>
        </HomeLayout>
    );
}

export default IndexProf;