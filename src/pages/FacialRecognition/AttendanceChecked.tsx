import { Link, Navigate } from "react-router-dom";
import HomeLayout from "../../components/ui/HomeLayout";
import { useEffect, useState } from "react";

export default function AttendanceChecked(){
    //estados
    const [redirect,setRedirect] = useState<boolean>(false);

    //efecto para redirigir tras 1 minuto
    useEffect(() => {
        //temporizador
        const redirectTimmer = setTimeout(() => setRedirect(true),60000);

        //cleanup del timeout
        return () => clearTimeout(redirectTimmer);
    },[]);

    //redirigir
    if(redirect){
        return <Navigate to={"/asistencia"}/>
    }


    //vista de asistencia marcada
    return (
        <HomeLayout title="Asistencia registrada">
            <h1 className="font-bold">Asistencia marcada con exito</h1>
            <p>La asistencia ha sido marcada de forma exitosa, puede ingresar al plantel</p>
            <Link className="text-blue-600" to="/asistencia">volver a checador</Link>
        </HomeLayout>
    );
}