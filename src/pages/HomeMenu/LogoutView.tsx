import { Navigate } from "react-router-dom";

function Logout(){
    //limpiar el localstorage
    localStorage.clear();

    //redirigir al login
    return (
        <Navigate to="/"/>
    );
}

export default Logout;