import { useStudents } from "../../hooks/custom/useStudents";
import ReturnButton from "../../componets/utils/buttons/ReturnButton";
import Create from "../CrudActions/Create";
import HomeLayout from "../Layouts/HomeLayout";
import { ALUMNOFIELDS } from "../../utils/Fields";
import { parseToModel } from "../../utils/parserModels";
import type { AlumnoConfig } from "../../interfaces/ModelsInterfaces";

function CreateAlu(){
    //contexto de alumno
    const context = useStudents();

    //funcion de manejo
    const onSubmit = (data:FormData) => {
        //activo por defecto
        data.append("status","activo");
        
        //paso al modelo de alumno
        const alumno = parseToModel<AlumnoConfig>(data);

        //gurdado en el contexto
        context.addStudent(alumno);
     }

     //retorno de vista
     return (
        <HomeLayout title="Modulo Alumno">
           <Create
                module="Alumno"
                fields={ALUMNOFIELDS.slice(0,ALUMNOFIELDS.length-1)}
                onSubmit={onSubmit}
            />
            <ReturnButton path="/alumno/"/>
         </HomeLayout>
     );
}

export default CreateAlu;