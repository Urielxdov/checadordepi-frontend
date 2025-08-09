import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
    const token = localStorage.getItem("access-token");
    return token ?<Outlet/>:<Navigate to="/"/>;
}

export default ProtectedRoute;