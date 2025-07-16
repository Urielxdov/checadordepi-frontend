import RowData from "./RowData";
import type { BaseModel } from "../../interfaces/ModelsInterfaces";
import FunctionButton from "../utils/buttons/FunctionButton";

//parametros de tabla
interface FunctionTableProps<T extends BaseModel>{
    type: 'DELETE' | 'UPDATE'
    action: (e: React.MouseEvent<HTMLButtonElement>) => void
    headers: Array<string>
    body: T[]
}

function FunctionTable<T extends BaseModel>({ type, action, headers, body }:FunctionTableProps<T>){
    if (headers.length === 0) {
    return <div className='text-gray-600'>No hay datos para mostrar</div>
  }

  //retorno de tabla
  headers = [...headers, 'accion']
  return (
    <div className='overflow-x-auto'>
      <table id='table' className='min-w-full table-auto border border-gray-300 text-left'>
        <thead className='bg-gray-200'>
          <tr>
            {headers.map((content, index) => (
              <th
                key={index}
                className='border border-gray-300 p-2 font-medium text-gray-700'
              >
                {content}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body && body.length > 0 ? (
            body.map((row) => (
                <tr key={row.id} className='odd:bg-white even:bg-gray-100' data-id={row.id}>
                    <RowData
                        key={row.id}
                        data={row}
                        editable={type=='UPDATE'? true: false}
                    />
                    {<td>
                      <FunctionButton
                          type={type}
                          action={action}
                      />
                    </td>}
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
  )
}

export default FunctionTable;