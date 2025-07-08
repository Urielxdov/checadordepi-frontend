import { createContext } from "react";
import { Profesor } from "../../models/ProfesorModel";
import { type TeacherStateProps } from "../../interfaces/componentConfig";
import { type TeacherActions } from "../../interfaces/componentConfig";

type TeacherContextConfig = {
    state: TeacherStateProps,
    dispatch: React.Dispatch<TeacherActions>,
    addTeacher: (teacher: Profesor) => void,
    updateTeacher: (teacher: Profesor) => void,
    deleteTeacher: (clave: string) => void,
    searchTeacher: (clave: string) => void
}

export const TeacherContext = createContext<TeacherContextConfig | undefined>(undefined);