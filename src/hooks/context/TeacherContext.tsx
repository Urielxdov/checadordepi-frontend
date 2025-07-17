import { createContext } from "react";
import { type TeacherStateProps } from "../../interfaces/componentConfig";
import { type TeacherActions } from "../../interfaces/componentConfig";

type TeacherContextConfig = {
    state: TeacherStateProps,
    dispatch: React.Dispatch<TeacherActions>,
    addTeacher: (data: FormData) => void,
    updateTeacher: (data: FormData) => void,
    deleteTeacher: (clave: string) => void,
    searchTeacher: (clave: string) => void
}

export const TeacherContext = createContext<TeacherContextConfig | undefined>(undefined);