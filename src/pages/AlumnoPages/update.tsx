import { useEffect } from "react";
import Update from "../CrudActions/Update";
import { useStudents } from "../../hooks/custom/useStudents";
import { type AlumnoConfig } from "../../interfaces/ModelsInterfaces";
import HomeLayout from "../Layouts/HomeLayout";
import ReturnButton from "../../componets/utils/buttons/ReturnButton";
import { ALUMNOHEADERS } from "../../utils/Headers";
import { parseFromArray } from "../../utils/parserModels";

function UpdateAlu(){
    //contexto de alumno
    const context = useStudents();

    //menejo de update
    const update = (data: Array<string>) => {
        let keys = ["id","nombre","apellidos","telefono","calle","colonia","correo","status"]
        //previene el recargo de la pagina
        const alumno = parseFromArray<AlumnoConfig>(keys, data);

        //paso al contexto
        context.updateStudent(alumno);
    }

    useEffect(()=>{
        const student = context.state.student;
        if(student){
            console.log("existeeeee");
        }
    },[context.state.student]);

    return (
        <HomeLayout title="Modulo Alumno">
            <Update
                module='alumno'
                entity={context.state.student}
                headers={ALUMNOHEADERS}
                onSearch={context.searchStudent}
                onUpdate={update}
            />
            <ReturnButton path="/alumno/"/>
        </HomeLayout>
    );
}

export default UpdateAlu;