import { createContext } from "react";
import { type TeacherStateProps } from "../../interfaces/componentConfig";
import { type TeacherActions } from "../../interfaces/componentConfig";
import type { ProfesorConfig } from "../../interfaces/ModelsInterfaces";

type TeacherContextConfig = {
    state: TeacherStateProps,
    dispatch: React.Dispatch<TeacherActions>,
    getTeachers: (page: number) => Promise<void>
    addTeacher: (teacher: ProfesorConfig) => Promise<boolean>,
    updateTeacher: (updated: ProfesorConfig) => Promise<boolean>,
    deleteTeacher: (clave: string) => Promise<boolean>,
    searchTeacher: (clave: string) => void
}

export const TeacherContext = createContext<TeacherContextConfig | undefined>(undefined);