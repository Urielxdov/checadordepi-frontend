import { ProgramProvider } from "../../hooks/providers/programs";
import ProtectedRoute from "./ProtectedRoute";

function ProgramWrapper(){
    return (
        <ProgramProvider>
            <ProtectedRoute />
        </ProgramProvider>
    );
}

export default ProgramWrapper;