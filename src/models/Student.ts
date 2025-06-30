export type Student = {
    id: string,
    nombre: string,
    apellido: string,
    direccion: string | null,
    telefono: string,
    correo: string,
    estado: string,
    foto?: File
}
