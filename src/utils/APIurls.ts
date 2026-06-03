const BASEAPIURL = import.meta.env.VITE_API_URL as string + "/";

export const STUDENTURL    = BASEAPIURL + "alumno";
export const TEACHERURL    = BASEAPIURL + "profesor";
export const PROGRAMURL    = BASEAPIURL + "programa_estudios";
export const USERURL       = BASEAPIURL + "auth";
export const ATTENDANCEURL = BASEAPIURL + "facial-recognition/student-attendance";
