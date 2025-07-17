import type { AlumnoConfig } from "../interfaces/ModelsInterfaces"

const apiUrl = ''

export const fetchStudents = async (query: string): Promise<AlumnoConfig[]> => {
  const res = await fetch(`${apiUrl} ${query}`)
  if (!res.ok) {
    // manejar el error
  }
  return res.json()
}