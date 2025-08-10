import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/custom/useAuth";

function Logout(){
    //limpiar la sesion
    useAuth().clear();

    //redirigir al login
    return (
        <Navigate to="/"/>
    );
}

export default Logout;