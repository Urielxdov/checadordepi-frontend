import { Outlet } from "react-router-dom";
import { AuthProvider } from "../../../hooks/custom/useAuth";


function AuthWrapper(){
    return (
        <AuthProvider>
            <Outlet />
        </AuthProvider>
    );
}

export default AuthWrapper;