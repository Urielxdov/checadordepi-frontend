import { TeacherProvider } from "../../../hooks/reducers/TeacherReducer";
import ProtectedRoute from "./ProtectedRoute";

function TeacherWrapper(){
    return (
        <TeacherProvider>
            <ProtectedRoute />
        </TeacherProvider>
    );
}

export default TeacherWrapper;