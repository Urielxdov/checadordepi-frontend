type AlumnoConfig = {
    noControl: string,
    nombre: string,
    apellidos: string,
    telefono: string,
    calle: string,
    colonia: string,
    correo: string
}

 export class Alumno{
    //propiedades
    public noControl: string;
    public nombre: string;
    public apellidos: string;
    public telefono: string;
    public calle: string;
    public colonia: string;
    public correo: string;

    //constructor
    constructor({noControl, nombre, apellidos, telefono, calle, colonia, correo}:AlumnoConfig){
        this.noControl = noControl;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.telefono = telefono;
        this.calle = calle;
        this.colonia = colonia;
        this.correo = correo;
    }

    //metodos de instancia
    toJson(){
        return {
            "noControl":this.noControl,
            "nombre":this.nombre,
            "apellidos":this.apellidos,
            "telefono":this.telefono,
            "calle":this.calle,
            "colonia":this.colonia,
            "correo":this.correo
        }
    }

    toArray(){
        return [
            this.noControl,
            this.nombre,
            this.apellidos,
            this.telefono,
            this.calle,
            this.colonia,
            this.correo
        ]
    }

}