import { type ProgramaConfig, type Dumpable } from "../interfaces/ModelsInterfaces";

export class ProgramaEstudios implements Dumpable {
    //propiedades
    public id: string;
    public nombre;
    public registro;
    public status;

    //constructor
    constructor({ id, nombre, registro, status }: ProgramaConfig) {
        //instancias
        this.id = id;
        this.nombre = nombre;
        this.registro = registro;
        this.status = status;
    }

    //metodos de instancia
    toArray(): Array<any> {
        return [
            this.id,
            this.nombre,
            this.registro,
            this.status
        ]
    }

    toJson(): Record<string, string | number> {
        return {
            id: this.id,
            nombre: this.nombre,
            registro: this.registro,
            status: this.status
        }
    }
}