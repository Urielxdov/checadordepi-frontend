import RowData from './RowData';
import type { BaseModel } from '../../../interfaces/Models';
import DeleteButton from '../../interactives/buttons/DeleteButton';

//propiedades de header
interface TableHeaderProps {
  header: String[]
  withAction?: boolean
}

//subcomponente header
export function TableHeader({ header, withAction }:TableHeaderProps){
  //encabezados de tabla
  return (
    <thead className='bg-gray-200'>
      <tr>
        {header.map((content, index) => (
          <th
            key={index}
            className='border border-gray-300 p-2 font-medium text-gray-700'
          >
            {content}
          </th>
        ))}
        {withAction && <th className='border border-gray-300 p-2 font-medium text-gray-700'>accion</th>}
      </tr>
    </thead>
  );
}

//propiedades de cuerpo de tabla
interface TableBodyProps<T extends BaseModel> {
  body: T[],
  action?: "list" | "delete"
  func?: (id: string) => void
}

//subcomponente body
function TableBody<T extends BaseModel>({ body, action, func }:TableBodyProps<T>){
  //cuerpo de tabla modo delete
  if(action == "delete" && func){
    return (
      <tbody>
        {body.map((row) => (
          <tr key={row.id} className='odd:bg-white even:bg-gray-100' data-id={row.id}>
            <RowData
              key={row.id}
              data={row}
            />
            <td className='border border-gray-300 p-2 align-top'>
              <DeleteButton action={() => func(row.id)}/>
            </td>
          </tr>
        ))}
      </tbody>
    );
  }
  
  //cuerpo de tabla (modo lectura)
  return (
    <tbody>
      {body.map((row) => (
          <tr key={row.id} className='odd:bg-white even:bg-gray-100' data-id={row.id}>
            <RowData
              key={row.id}
              data={row}
            />
          </tr>
        ))}
    </tbody>
  );
}

//propiedades de tabla
interface TableProps<T extends BaseModel> {
  header: string[]
  body: T[],
  action?: "list" | "delete"
  func?: (id: string) => void
}

//componente de tabla
export function Table<T extends BaseModel>({ header, body, action = "list", func }: TableProps<T>) {
  //componente tabla modo lista
  return (
    <div className='overflow-x-auto'>
      <table
        className='min-w-full table-auto border border-gray-300 text-left'
      >
        <TableHeader header={header} withAction={action != "list"}/>
        {body.length ? 
          <TableBody body={body} action={action} func={func}/>
          :<tbody>
              <tr>
                <td
                  colSpan={header.length}
                  className='p-4 text-center text-gray-600'
                >
                  No hay registros disponibles
                </td>
              </tr>
          </tbody>
        }
      </table>
    </div>
  );
}
