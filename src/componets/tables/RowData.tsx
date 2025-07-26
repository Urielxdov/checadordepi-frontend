import type { BaseModel } from "../../interfaces/ModelsInterfaces";

interface RowDataConfig<T extends BaseModel>{
    data: T
    editable?:boolean,
    change?: (id: string, key: string, value: any) => void
}

function RowData<T extends BaseModel>({ data, editable, change }:RowDataConfig<T>){
    //si es editable
    if(editable && change){
        return (
        <>
            {Object.keys(data).map((key) => (
                    <td key={key} className='border border-gray-300 p-2 align-top'>
                        {key != 'id' ? <input name={key} onChange={e => change(data.id, e.target.name, e.target.value)} defaultValue={String(data[key as keyof T])} />:<p>{data.id}</p>}
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