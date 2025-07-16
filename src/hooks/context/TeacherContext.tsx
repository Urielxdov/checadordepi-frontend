import { createContext } from "react";
import type { ProfesorConfig } from "../../interfaces/ModelsInterfaces";
import { type TeacherStateProps } from "../../interfaces/componentConfig";
import { type TeacherActions } from "../../interfaces/componentConfig";

type TeacherContextConfig = {
    state: TeacherStateProps,
    dispatch: React.Dispatch<TeacherActions>,
    addTeacher: (teacher: ProfesorConfig) => void,
    updateTeacher: (data: Array<any>) => void,
    deleteTeacher: (clave: string) => void,
    searchTeacher: (clave: string) => void
}

export const TeacherContext = createContext<TeacherContextConfig | undefined>(undefined);