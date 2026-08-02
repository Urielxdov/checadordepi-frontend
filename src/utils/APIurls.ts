const withTrailingSlash = (url: string) => url.endsWith("/") ? url : `${url}/`;

// API base
const ADMINAPIURL = withTrailingSlash(import.meta.env.VITE_ADMIN_URL ?? "http://localhost:8000");
const CLIENTAPIURL = withTrailingSlash(import.meta.env.VITE_CLIENT_URL ?? "http://localhost:8000");

//enpoints de entidad
export const STUDENTURL = ADMINAPIURL+"alumno";
export const TEACHERURL = ADMINAPIURL+"profesor";
export const PROGRAMURL = ADMINAPIURL+"programa_estudios";
export const USERURL = ADMINAPIURL+"auth";
export const ATTENDANCEURL = CLIENTAPIURL+"facial-recognition/student-attendance";
