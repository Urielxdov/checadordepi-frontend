import { ProgramProvider } from "../../../hooks/reducers/ProgramReducer";
import ProtectedRoute from "./ProtectedRoute";

function ProgramWrapper(){
    return (
        <ProgramProvider>
            <ProtectedRoute />
        </ProgramProvider>
    );
}

export default ProgramWrapper;