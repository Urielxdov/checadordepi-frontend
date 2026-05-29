import ReturnButton from "../../components/interactives/buttons/ReturnButton";
import HomeLayout from "../../components/ui/HomeLayout";
import { Table } from "../../components/ui/tables/Table";
import type { AlumnoModel } from "../../interfaces/Models";
import { ALUMNOHEADERS } from "../../utils/Headers";
import { useEffect, useState } from "react";
import { getActiveStudents } from "../../services/studentsService";
import { useAuth } from "../../hooks/context/AuthContext";
import { useNavigate } from "react-router-dom";

//pagina para mostrar alumnos que requieren justificarse
export default function JustifyAlu(){
    //estados
    const [alumnos,setAlumnos] = useState<Array<AlumnoModel>>([]);

    const navigate = useNavigate();

    //contextos
    const authctx = useAuth();

    //efecto para pedir alumnos
    useEffect(() => {
        getActiveStudents(0,authctx.token).then(data => {
            setAlumnos(data.data);
        }).catch(err => console.log(err));
    },[]);

    //pagina
    return(
        <HomeLayout title="Insidencias">
            <Table
                header={ALUMNOHEADERS}
                body={alumnos}
                action="navigate"
                func={(id) => { navigate("/alumno/justify/"+id) }}
            />
            <ReturnButton path="/alumno/"/>
        </HomeLayout>
    );
}