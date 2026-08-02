import { ProgramProvider } from "../../hooks/providers/programs";
import ProtectedRoute from "./ProtectedRoute";

function ProgramWrapper(){
    return (
        <ProgramProvider>
            <ProtectedRoute requiredRole="Administrador" />
        </ProgramProvider>
    );
}

export default ProgramWrapper;
