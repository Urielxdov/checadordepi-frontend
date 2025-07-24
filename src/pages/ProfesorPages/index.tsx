import { useTeachers } from "../../hooks/custom/useTeachers";
import { PROFESORHEADERS } from "../../utils/Headers";
import Index from "../CrudActions/Index";
import HomeLayout from "../Layouts/HomeLayout";
import ReturnButton from "../../componets/utils/buttons/ReturnButton";
import { useEffect } from "react";

function IndexProf(){
    //contexto
    const context = useTeachers();

    useEffect(() => {
        context.getTeachers(1);
    },[]);

    //vista de la pagina
    return (
        <HomeLayout title="Lista de profesores">
            <Index 
                headers={PROFESORHEADERS}
                data={context.state.teachers}
            />
            <ReturnButton path="/profesor/"/>
        </HomeLayout>
    );
}

export default IndexProf;