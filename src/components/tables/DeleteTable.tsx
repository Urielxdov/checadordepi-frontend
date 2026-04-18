import type { BaseModel } from "../../interfaces/Models";
import RowData from "./RowData";
import DeleteButton from "../utils/buttons/DeleteButton";

interface DeleteTableConfig<T extends BaseModel> {
    headers: Array<string>
    body: T[]
    action: (id: string) => void
}

function DeleteTable<T extends BaseModel>({ headers, body, action }:DeleteTableConfig<T>){
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
                />
                <td>
                    <DeleteButton
                        action={() => action(row.id as string)}
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

export default DeleteTable;