const ADMIN_BASE  = (import.meta.env.VITE_ADMIN_URL  as string) + "/";
const CLIENT_BASE = (import.meta.env.VITE_CLIENT_URL as string) + "/";

export const STUDENTURL    = ADMIN_BASE  + "alumno";
export const TEACHERURL    = ADMIN_BASE  + "profesor";
export const PROGRAMURL    = ADMIN_BASE  + "programa_estudios";
export const USERURL       = ADMIN_BASE  + "auth";
export const ATTENDANCEURL = CLIENT_BASE + "facial-recognition/student-attendance";
