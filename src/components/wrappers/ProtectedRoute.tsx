import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../hooks/context/AuthContext";
import { useContext } from "react";

interface ProtectedRouteProps {
    requiredRole?: string
}

function ProtectedRoute({ requiredRole }: ProtectedRouteProps) {
    const context = useContext(AuthContext);
    if(!context?.token){ return <Navigate to="/"/>; }
    if(requiredRole && context.role !== requiredRole){ return <Navigate to="/asistencia"/>; }
    return <Outlet/>;
}

export default ProtectedRoute;
