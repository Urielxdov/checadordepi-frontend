import Create from "../CrudActions/Create";
import HomeLayout from "../Layouts/HomeLayout";
import ReturnButton from "../../componets/utils/buttons/ReturnButton";
import { PROFESORFIELDS } from "../../utils/Fields";
import { useTeachers } from "../../hooks/custom/useTeachers";
import { parseToModel } from "../../utils/parserModels";
import type { ProfesorConfig } from "../../interfaces/ModelsInterfaces";

function CreateProf(){
    //uso del contexto
    const context = useTeachers();

    //manejo de datos
    const submit = (data:FormData) => {
        //activo por defecto
        data.append("status","activo");

        //objeto convertido
        const profesor = parseToModel<ProfesorConfig>(data);

        //guardado en el contexto
        context.addTeacher(profesor);
    }

    //retorno de la vista
    return (
        <HomeLayout title={"Modulo profesor"}>
            <Create
                module="profesor"
                fields={PROFESORFIELDS.slice(0, PROFESORFIELDS.length-1)}
                onSubmit={submit}
            />
            <ReturnButton path="/profesor/"/>
        </HomeLayout>
    );
}

export default CreateProf;