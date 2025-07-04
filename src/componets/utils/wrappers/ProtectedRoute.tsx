import { Navigate, Outlet } from "react-router-dom";
import { getAuthContext } from "../../../hooks/custom/useAuth";

function ProtectedRoute() {
    const context = getAuthContext();
    return context.valid ?<Outlet/>:<Navigate to="/"/>;
}

export default ProtectedRoute;