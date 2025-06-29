import { type AlumnoConfig, type ProfesorConfig, type ProgramaConfig } from "../interfaces/ModelsInterfaces";

 export class Alumno{
    //propiedades
    public noControl: string;
    public nombre: string;
    public apellidos: string;
    public telefono: string;
    public calle: string;
    public colonia: string;
    public correo: string;
    public status: string;

    //constructor
    constructor({noControl, nombre, apellidos, telefono, calle, colonia, correo, status}:AlumnoConfig){
        this.noControl = noControl;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.telefono = telefono;
        this.calle = calle;
        this.colonia = colonia;
        this.correo = correo;
        this.status = status;
    }

    //metodos de instancia
    toJson():object{
        return {
            "noControl":this.noControl,
            "nombre":this.nombre,
            "apellidos":this.apellidos,
            "telefono":this.telefono,
            "calle":this.calle,
            "colonia":this.colonia,
            "correo":this.correo,
            "status":this.status
        }
    }

    toArray():Array<string>{
        return [
            this.noControl,
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

export class Profesor{
    //propiedades
    public clave: string
    public nombre: string
    public apellidos: string
    public telefono: string
    public calle: string
    public colonia: string
    public correo: string
    public grado: string
    public nombre_grado: string
    public status: string

    //constructor
    constructor ({clave, nombre, apellidos, telefono, calle, colonia, correo, grado, nombre_grado, status}:ProfesorConfig){
        //instancias
        this.clave = clave;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.telefono = telefono;
        this.calle = calle;
        this.colonia = colonia;
        this.correo = correo;
        this.grado = grado;
        this.nombre_grado = nombre_grado;
        this.status = status;
    }

    //metodos de instancia
    toArray():Array<string>{
        return [
            this.clave,
            this.nombre,
            this.apellidos,
            this.telefono,
            this.calle,
            this.colonia,
            this.correo,
            this.grado,
            this.nombre_grado,
            this.status
        ]
    }

    toJson():object{
        return {
            "clave":this.clave,
            "nombre":this.nombre,
            "apellidos":this.apellidos,
            "telefono":this.telefono,
            "calle":this.calle,
            "colonia":this.colonia,
            "correo":this.correo,
            "grado":this.grado,
            "nombre_grado":this.nombre_grado,
            "status":this.status
        }
    }
}

export class ProgramaEstudios {
    //propiedades
    public id;
    public nombre;
    public registro;
    public status;

    //constructor
    constructor({id, nombre, registro, status}:ProgramaConfig){
        //instancias
        this.id = id;
        this.nombre = nombre;
        this.registro = registro;
        this.status = status;
    }

    //metodos de instancia
    toArray():Array<any>{
        return [
            this.id,
            this.nombre,
            this.registro,
            this.status
        ]
    }

    toJson():object{
        return {
            "id":this.id,
            "nombre":this.nombre,
            "registro":this.registro,
            "status":this.status
        }
    }
}