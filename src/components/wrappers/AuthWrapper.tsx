import AuthProvider from "../../hooks/providers/auth";
import { Outlet } from "react-router-dom";

function AuthWrapper(){
    return (
        <AuthProvider>
            <Outlet/>
        </AuthProvider>
    );
}

export default AuthWrapper;