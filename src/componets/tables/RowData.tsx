import type { FieldProps } from "../../interfaces/componentConfig";
import type { BaseModel } from "../../interfaces/ModelsInterfaces";
import Input from "../forms/Input";

interface RowDataConfig<T extends BaseModel>{
    data: T
    editable?:boolean,
}

function RowData<T extends BaseModel>({ data, editable }:RowDataConfig<T>){
    //si es editable
    if(editable){
        return (
        <>
            {Object.keys(data).map((key) => (
                    <td key={key} className='border border-gray-300 p-2 align-top'>
                        <input name={key} defaultValue={String(data[key as keyof T])} />
                    </td>
            ))}
        </>
    );
    }

    //retorno del componente
    return (
        <>
            {Object.keys(data).map((key) => (
                <td key={key} className='border border-gray-300 p-2 align-top'><p>{String(data[key as keyof T])}</p></td>
            ))}
        </>
    );
}

export default RowData