import { AuthProvider } from "../../../hooks/custom/useAuth";
import { Outlet } from "react-router-dom";

function AuthWrapper(){
    return (
        <AuthProvider>
            <Outlet/>
        </AuthProvider>
    );
}

export default AuthWrapper;