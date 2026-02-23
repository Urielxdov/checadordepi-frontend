import { createContext } from "react";
import { type TeacherStateProps } from "../../interfaces/componentConfig";
import { type TeacherActions } from "../../interfaces/componentConfig";
import type { ProfesorConfig } from "../../interfaces/ModelsInterfaces";

type TeacherContextConfig = {
    state: TeacherStateProps,
    dispatch: React.Dispatch<TeacherActions>,
    getTeachers: (page: number, tk:string) => Promise<void>
    addTeacher: (teacher: ProfesorConfig, tk:string) => Promise<boolean>,
    updateTeacher: (updated: ProfesorConfig, tk:string) => Promise<boolean>,
    deleteTeacher: (clave: string, tk:string) => Promise<boolean>,
    searchTeacher: (clave: string) => void
}

export const TeacherContext = createContext<TeacherContextConfig | undefined>(undefined);