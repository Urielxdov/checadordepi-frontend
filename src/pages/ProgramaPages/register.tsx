import Create from "../CrudActions/Create";
import HomeLayout from "../Layouts/HomeLayout";
import ReturnButton from "../../componets/utils/buttons/ReturnButton";
import { PROGRAMAFIELDS } from "../../utils/Fields";
import { usePrograms } from "../../hooks/custom/usePrograms";
import { parseToModel } from "../../utils/parserModels";
import type { ProgramaConfig } from "../../interfaces/ModelsInterfaces";

function CreateProg(){
    //uso del contexto
    const context = usePrograms();

    //manejo de datos
    const submit = (data:FormData) => {
        //activo por defecto
        data.append("status","activo");

        //objeto convertido
        const programa = parseToModel<ProgramaConfig>(data);

        //guardado en el contexto
        context.addProgram(programa);
    }

    //retorno de la vista
    return (
        <HomeLayout title={"Modulo curso"}>
            <Create
                module="curso"
                fields={PROGRAMAFIELDS.slice(0, PROGRAMAFIELDS.length-1)}
                onSubmit={submit}
            />
            <ReturnButton path="/curso/"/>
        </HomeLayout>
    );
}

export default CreateProg;