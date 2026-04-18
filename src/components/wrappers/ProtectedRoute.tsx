import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../hooks/context/AuthContext";
import { useContext } from "react";

function ProtectedRoute() {
    const context = useContext(AuthContext);
    return context?.token != "" ?<Outlet/>:<Navigate to="/"/>;
}

export default ProtectedRoute;