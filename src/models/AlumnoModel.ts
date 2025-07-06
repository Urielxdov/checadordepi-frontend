import { type AlumnoConfig, type Dumpable } from "../interfaces/ModelsInterfaces";

export class Alumno implements Dumpable{
    //propiedades
    public id: string;
    public nombre: string;
    public apellidos: string;
    public telefono: string;
    public calle: string;
    public colonia: string;
    public correo: string;
    public status: string;

    //constructor
    constructor({id, nombre, apellidos, telefono, calle, colonia, correo, status}:AlumnoConfig){
        this.id = id;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.telefono = telefono;
        this.calle = calle;
        this.colonia = colonia;
        this.correo = correo;
        this.status = status;
    }

    //metodos de instancia
    toJson():Record<string, string>{
        return {
            noControl:this.id,
            nombre:this.nombre,
            apellidos:this.apellidos,
            telefono:this.telefono,
            calle:this.calle,
            colonia:this.colonia,
            correo:this.correo,
            status:this.status
        }
    }

    toArray():Array<string>{
        return [
            this.id,
            this.nombre,
            this.apellidos,
            this.telefono,
            this.calle,
            this.colonia,
            this.correo,
            this.status
        ]
    }
}