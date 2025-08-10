import { usePrograms } from "../../hooks/custom/usePrograms";
import { PROGRAMAHEADERS } from "../../utils/Headers";
import Index from "../CrudActions/Index";
import HomeLayout from "../Layouts/HomeLayout";
import ReturnButton from "../../componets/utils/buttons/ReturnButton";
import PageBar from "../../componets/ui/pageBar";
import { useAuth } from "../../hooks/custom/useAuth";

function IndexProg(){
    //hook de jwt
    const jwt = useAuth();

    //contexto
    const context = usePrograms();

    //vista de la pagina
    return (
        <HomeLayout title="Lista de profesores">
            <Index 
                headers={PROGRAMAHEADERS}
                data={context.state.programs}
            />
            <PageBar
                current={context.state.current_page}
                total={context.state.total}
                onChange={(page: number) => context.getPrograms(page, jwt.token)}
            />
            <ReturnButton path="/curso/"/>
        </HomeLayout>
    );
}

export default IndexProg;