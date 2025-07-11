export function parseToModel<T>(data:FormData):T{
    //obtener entradas
    const entries = data.entries();
    //contenedor de modelo
    let model = {} as T

    //pasar propiedades al modelo
    for(const [key, value] of entries){
        model = {...model, [key]: value }
    }
    //retornar el modelo
    return model;
}

export function parseFromArray<T extends Record<string, any>>(keys: Array<string>, data:Array<string>):T{
    //modelo
    let model = {} as T;


    //construir
    let i = 0;
    for(const key of keys){
        model = {...model, [key]: data[i]}
        i++;
    }

    return model;
}