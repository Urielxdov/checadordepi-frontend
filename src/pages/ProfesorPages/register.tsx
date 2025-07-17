import Create from "../CrudActions/Create";
import HomeLayout from "../Layouts/HomeLayout";
import ReturnButton from "../../componets/utils/buttons/ReturnButton";
import { PROFESORFIELDS } from "../../utils/Fields";
import { useTeachers } from "../../hooks/custom/useTeachers";

function CreateProf(){
    //uso del contexto
    const context = useTeachers();

    const { addTeacher } = context

    //retorno de la vista
    return (
        <HomeLayout title={"Modulo profesor"}>
            <Create
                module="profesor"
                fields={PROFESORFIELDS.slice(0, PROFESORFIELDS.length-1)}
                onSubmit={addTeacher}
            />
            <ReturnButton path="/profesor/"/>
        </HomeLayout>
    );
}

export default CreateProf;