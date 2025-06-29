import { useContext } from "react";
import { StudentsContext } from "../reducers/AlumnoReducer";

export function useStudents () {
    const context = useContext(StudentsContext)
    if(!context) {
        throw new Error("useStudent debe de usar un provedor de StudentProvider")
    }
    return context
}