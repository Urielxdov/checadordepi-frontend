import { createContext } from "react";
import type { TeacherStateProps } from "../reducers/TeacherReducer";
import type { ProfesorModel } from "../../interfaces/Models";

type TeacherContextConfig = {
    state: TeacherStateProps,
    getTeachers: (page: number, tk:string) => Promise<void>
    addTeacher: (teacher: ProfesorModel, tk:string) => Promise<boolean>,
    updateTeacher: (updated: ProfesorModel, tk:string) => Promise<boolean>,
    deleteTeacher: (clave: string, tk:string) => Promise<boolean>,
    searchTeacher: (clave: string) => void
}

export const TeacherContext = createContext<TeacherContextConfig | undefined>(undefined);