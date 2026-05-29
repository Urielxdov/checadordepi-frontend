import ReturnButton from "../../components/interactives/buttons/ReturnButton";
import HomeLayout from "../../components/ui/HomeLayout";
import { Table } from "../../components/ui/tables/Table";
import type { AlumnoModel } from "../../interfaces/Models";
import { ALUMNOHEADERS } from "../../utils/Headers";
import { useEffect, useState } from "react";
import { getStudent } from "../../services/studentsService";
import { useAuth } from "../../hooks/context/AuthContext";
import { useParams } from "react-router-dom";
import Form from "../../components/interactives/forms/Form";
import TextArea from "../../components/interactives/inputs/textarea";
import Button from "../../components/interactives/buttons/Button";

//pagina para mostrar alumnos que requieren justificarse
export default function JustifyOneAlu(){
    //estados
    const [alumno,setAlumno] = useState<AlumnoModel|null>(null);

    const params = useParams();

    //contextos
    const authctx = useAuth();

    //efecto para pedir alumnos
    useEffect(() => {
        if(!params.id){
            return;
        }

        getStudent(params.id,authctx.token).then(
            alumno => setAlumno(alumno)
        ).catch(err => console.error(err))
    },[]);

    //validar alumno
    if(!alumno){
        return(
            <HomeLayout title="Insidencias">
                <p className="text-center">sin registro</p>
                <ReturnButton path="/alumno/"/>
            </HomeLayout>
        );
    }

    //pagina
    return(
        <HomeLayout title="Insidencias">
            <Table
                header={ALUMNOHEADERS}
                body={[alumno]}
                action="list"
            />
            <Form id="justify" onSubmit={() => {}}>
                <TextArea 
                    label="Justificacion"
                    name="justificacion"
                    maxLength={256}
                    change={() => {}}
                />
                <Button text="justificar" submit={true} action={() => {}} />
            </Form>
            <ReturnButton path="/alumno/"/>
        </HomeLayout>
    );
}