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