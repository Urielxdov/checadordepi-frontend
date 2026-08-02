import { TeacherProvider } from "../../hooks/providers/teachers";
import ProtectedRoute from "./ProtectedRoute";

function TeacherWrapper(){
    return (
        <TeacherProvider>
            <ProtectedRoute requiredRole="Administrador" />
        </TeacherProvider>
    );
}

export default TeacherWrapper;
