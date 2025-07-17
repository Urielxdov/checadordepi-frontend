import Create from "../CrudActions/Create";
import HomeLayout from "../Layouts/HomeLayout";
import ReturnButton from "../../componets/utils/buttons/ReturnButton";
import { PROGRAMAFIELDS } from "../../utils/Fields";
import { usePrograms } from "../../hooks/custom/usePrograms";

function CreateProg(){
    //uso del contexto
    const context = usePrograms();

    const { addProgram } = context

    //retorno de la vista
    return (
        <HomeLayout title={"Modulo curso"}>
            <Create
                module="curso"
                fields={PROGRAMAFIELDS.slice(0, PROGRAMAFIELDS.length-1)}
                onSubmit={addProgram}
            />
            <ReturnButton path="/curso/"/>
        </HomeLayout>
    );
}

export default CreateProg;