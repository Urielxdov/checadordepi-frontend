import { usePrograms } from "../../hooks/custom/usePrograms";
import { PROGRAMAHEADERS } from "../../utils/Headers";
import HomeLayout from "../../components/ui/HomeLayout";
import ReturnButton from "../../components/interactives/buttons/ReturnButton";
import { useAuth } from "../../hooks/custom/useAuth";
import Index from "../CrudActions/Index";
import PageBar from "../../components/ui/pageBar";

function IndexProg(){
    //hook de jwt
    const jwt = useAuth();

    //contexto
    const context = usePrograms();

    //vista de la pagina
    return (
        <HomeLayout title="Lista de programas">
            <Index
                headers={PROGRAMAHEADERS}
                body={context.state.programs}
                onSearch={s => context.searchProgram(s)}
            />
            <PageBar
                current={context.state.current_page}
                total={context.state.total}
                onChange={(page: number) => context.getPrograms(page, jwt.token)}
            />
            <ReturnButton path="/programa/"/>
        </HomeLayout>
    );
}

export default IndexProg;