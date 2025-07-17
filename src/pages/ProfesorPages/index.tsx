import { useTeachers } from "../../hooks/custom/useTeachers";
import { PROFESORHEADERS } from "../../utils/Headers";
import Index from "../CrudActions/Index";
import HomeLayout from "../Layouts/HomeLayout";
import ReturnButton from "../../componets/utils/buttons/ReturnButton";

function IndexProf(){
    //contexto
    const context = useTeachers();

    //vista de la pagina
    return (
        <HomeLayout title="Lista de profesores">
            <Index 
                headers={PROFESORHEADERS}
                data={context.state.teachers}
                action={context.searchTeacher}
            />
            <ReturnButton path="/profesor/"/>
        </HomeLayout>
    );
}

export default IndexProf;