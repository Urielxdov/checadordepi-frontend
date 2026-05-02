import type { BaseModel } from "../../../interfaces/Models";
import { useUpdate } from "../../../hooks/reducers/UpdateReducer";
import RowData from "./RowData";
import UpdateButton from "../../interactives/buttons/UpdateButton";
import { TableHeader } from "./Table";

interface EditableTable<T extends BaseModel>{
    headers: Array<string>,
    body: T[],
    action: (updated: T) => void //se manda al contexto
}
//tabla editable
export default function EditableTable<T extends BaseModel>({ headers, body, action }:EditableTable<T>){
    //uso de hook
    const { state, handleChange, handleUpdate } = useUpdate(body);

    //manejo de update
    const update = (id: string) => {
        //maneja el hook
        handleUpdate(id);

        //si se encontro
        if(state.updated){
            action(state.updated);
        }
    }

    //componente
    return (
        <div className='overflow-x-auto'>
            <table className='min-w-full table-auto border border-gray-300 text-left'>
                <TableHeader header={headers} withAction={true}/>
                <tbody>
                    {body && body.length > 0 ?
                        body.map((row:T) => (
                        <tr key={row.id} className='odd:bg-white even:bg-gray-100'>
                            <RowData
                                key={row.id}
                                data={row}
                                editable={true}
                                change={handleChange}
                            />
                            <td>
                                <UpdateButton
                                    key={row.id}
                                    action={() => update(row.id)}
                                />
                            </td>
                        </tr>
                        ))
                    : 
                        <tr>
                            <td
                                colSpan={headers.length}
                                className='p-4 text-center text-gray-600'
                            >
                                No hay registros disponibles
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}