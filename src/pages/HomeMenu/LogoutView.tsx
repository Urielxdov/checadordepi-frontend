import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/custom/useAuth";
import { useEffect } from "react";
import HomeLayout from "../../components/ui/HomeLayout";

function Logout(){
    //contexto de jwt
    const jwt = useAuth();

    //limpiar al montar
    useEffect(() => {
        jwt.clear();
    },[]);

    //redirigir al login
    return (
        <HomeLayout title="Sesion terminada">
            <>
                <p className="text-center">La sesion se ha cerrado o ha expirado, para volver a ingresar de click en el enlace</p>
                <Link className="text-blue-600 text-center" to="/">volver a acceder</Link>
            </>
        </HomeLayout>
    );
}

export default Logout;