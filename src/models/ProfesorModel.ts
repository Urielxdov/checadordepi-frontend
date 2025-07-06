import { type ProfesorConfig, type Dumpable } from "../interfaces/ModelsInterfaces"

export class Profesor implements Dumpable{
    //propiedades
    public id: string
    public nombre: string
    public apellidos: string
    public telefono: string
    public correo: string
    public grado: string
    public nombre_grado: string
    public status: string

    //constructor
    constructor ({id, nombre, apellidos, telefono, correo, grado, nombre_grado, status}:ProfesorConfig){
        //instancias
        this.id = id;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.telefono = telefono;
        this.correo = correo;
        this.grado = grado;
        this.nombre_grado = nombre_grado;
        this.status = status;
    }

    //metodos de instancia
    toArray():Array<string>{
        return [
            this.id,
            this.nombre,
            this.apellidos,
            this.telefono,
            this.correo,
            this.grado,
            this.nombre_grado,
            this.status
        ]
    }

    toJson():Record<string, string | number>{
        return {
            clave:this.id,
            nombre:this.nombre,
            apellidos:this.apellidos,
            telefono:this.telefono,
            correo:this.correo,
            grado:this.grado,
            nombre_grado:this.nombre_grado,
            status:this.status
        }
    }
}