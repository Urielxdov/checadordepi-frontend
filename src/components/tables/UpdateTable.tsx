import type { BaseModel } from "../../interfaces/Models";
import { useUpdate } from "../../hooks/reducers/UpdateReducer";
import RowData from "./RowData";
import UpdateButton from "../utils/buttons/UpdateButton";

interface UpdateTableConfig<T extends BaseModel>{
    headers: Array<string>,
    body: T[],
    action: (updated: T) => void //se manda al contexto
}

function UpdateTable<T extends BaseModel>({ headers, body, action }:UpdateTableConfig<T>){
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
            <thead className='bg-gray-200'>
            <tr>
                {headers.map((content: string, index:number) => (
                <th
                    key={index}
                    className='border border-gray-300 p-2 font-medium text-gray-700'
                >
                    {content}
                </th>
                ))}
                <th className='border border-gray-300 p-2 font-medium text-gray-700'>accion</th>
            </tr>
            </thead>
            <tbody>
            {body && body.length > 0 ? (
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
            ) : (
                <tr>
                <td
                    colSpan={headers.length}
                    className='p-4 text-center text-gray-600'
                >
                    No hay registros disponibles
                </td>
                </tr>
            )}
            </tbody>
        </table>
        </div>
    );
}

export default UpdateTable;