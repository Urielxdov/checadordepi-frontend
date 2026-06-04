import type { BaseModel } from "../../../interfaces/Models";
import ComboBox from "../../interactives/forms/Combo";
import { STATUSOPTIONS } from "../../../utils/Options";

interface RowDataConfig<T extends BaseModel>{
    data: T
    editable?:boolean,
    change?: (id: string, key: string, value: any) => void
}

function RowData<T extends BaseModel>({ data, editable, change }:RowDataConfig<T>){
    //si es editable
    if(editable && change) {
        //obtener estados
        const stat = "registro" in data ? [STATUSOPTIONS[0],STATUSOPTIONS[2]] : STATUSOPTIONS;
        return (
            <>
                {Object.keys(data).map((key) => {
                    //status
                    if(key == "status"){
                        return (
                            <td key={key} className='px-4 py-3 align-middle text-gray-700'>
                                <ComboBox 
                                    name="status"
                                    id="status-select"
                                    items={stat}
                                    select={data.status}
                                    onChange={(key, value) => change(data.id, key, value)}
                                />
                            </td>
                        );
                    }
                    //id no se edita
                    if(key == "id"){
                        return <td className='px-4 py-3 align-middle text-gray-700'><p>{data.id}</p></td>;
                    }

                    return (
                            <td key={key} className='px-4 py-3 align-middle text-gray-700'>
                                <input name={key} onChange={e => change(data.id, e.target.name, e.target.value)} defaultValue={String(data[key as keyof T])} />
                            </td>
                    );
                })}
            </>
        );
    }

    //retorno del componente
    return (
        <>
            {Object.keys(data).map((key) => (
                <td key={key} className='px-4 py-3 align-middle text-gray-700'>
                    <p>
                        {String(data[key as keyof T])}
                    </p>
                </td>
            ))}
        </>
    );
}

export default RowData