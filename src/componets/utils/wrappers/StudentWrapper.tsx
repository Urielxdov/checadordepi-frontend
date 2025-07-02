import { StudentProvider } from "../../../hooks/reducers/AlumnoReducer";
import ProtectedRoute from "./ProtectedRoute";

function StudentWrapper(){
    return (
        <StudentProvider>
            <ProtectedRoute />
        </StudentProvider>
    );
}

export default StudentWrapper;