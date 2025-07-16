import { usePrograms } from "../../hooks/custom/usePrograms";
import { PROGRAMAHEADERS } from "../../utils/Headers";
import Index from "../CrudActions/Index";
import HomeLayout from "../Layouts/HomeLayout";
import ReturnButton from "../../componets/utils/buttons/ReturnButton";

function IndexProg(){
    //contexto
    const context = usePrograms();

    //vista de la pagina
    return (
        <HomeLayout title="Lista de profesores">
            <Index 
                headers={PROGRAMAHEADERS}
                data={context.state.programs}
            />
            <ReturnButton path="/curso/"/>
        </HomeLayout>
    );
}

export default IndexProg;