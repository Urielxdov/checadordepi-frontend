import type { BaseModel } from "../../interfaces/Models";
import ComboBox from "../forms/Combo";
import { STATUSOPTIONS } from "../../utils/Options";

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
            {Object.keys(data).map((key) => {
                //status
                if(key == "status"){
                    return (<td key={key}><ComboBox name="status" id="status-select" items={STATUSOPTIONS} select={data.status} onChange={(key, value) => change(data.id, key, value)}/></td>);
                }
                //otros valores
                if(key != "id"){
                    return (
                        <td key={key} className='border border-gray-300 p-2 align-top'>
                            <input name={key} onChange={e => change(data.id, e.target.name, e.target.value)} defaultValue={String(data[key as keyof T])} />
                        </td>
                    );
                }else{
                    return <td><p>{data.id}</p></td>;
                }
            })}
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