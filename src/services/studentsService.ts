import type Alumno from "../interfaces/AlumnoInterface";

const apiUrl = ''

export const fetchStudents = async (query: string): Promise<Alumno[]> => {
  const res = await fetch(`${apiUrl} ${query}`)
  if (!res.ok) {
    // manejar el error
  }
  return res.json()
}