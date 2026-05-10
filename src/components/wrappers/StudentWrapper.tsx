import StudentProvider from "../../hooks/providers/students";
import ProtectedRoute from "./ProtectedRoute";

export default function StudentWrapper(){
    return (
        <StudentProvider>
            <ProtectedRoute />
        </StudentProvider>
    );
}