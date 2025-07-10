import Delete from "../CrudActions/Delete";
import HomeLayout from "../Layouts/HomeLayout";
import ReturnButton from "../../componets/utils/buttons/ReturnButton";
import { ALUMNOHEADERS } from "../../utils/Headers";
import { useStudents } from "../../hooks/custom/useStudents";

function DeleteAlu(){
    //contexto de alumno
    const context = useStudents();

    //manejo de eliminacion
    const drop = () => {
        //obtener alumno
        const alumno = context.state.student;

        //validacion de existencia (nadamas para que ts no llore)
        if(alumno){
            context.deleteStudent(alumno.id);
        }
    }

    //retorno de componente
    return(
        <HomeLayout title="Modulo Alumno">
            <Delete 
                module="alumno"
                headers={ALUMNOHEADERS}
                entity={context.state.student}
                onSearch={context.searchStudent}
                onDelete={drop}
            />
            <ReturnButton path="/alumno/"/>
        </HomeLayout>
    );
}

export default DeleteAlu;