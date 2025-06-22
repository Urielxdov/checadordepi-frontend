export default interface Alumno {
  id: string,
  apellidos: string,
  nombres: string,
  direccion?: string
  telefono: string,
  correo: string,
  estado: string,
  foto: string // Aqui ocupamos la direccion de la foto y mandamos como solicitud en una api
}