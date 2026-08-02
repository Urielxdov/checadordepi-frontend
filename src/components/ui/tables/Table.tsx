import RowData from './RowData';
import type { BaseModel } from '../../../interfaces/Models';
import DeleteButton from '../../interactives/buttons/DeleteButton';
import Button from '../../interactives/buttons/Button';
import { Pencil, Trash2 } from 'lucide-react';

//propiedades de header
interface TableHeaderProps {
  header: String[]
  withAction?: boolean
}

//subcomponente header
export function TableHeader({ header, withAction }:TableHeaderProps){
  //encabezados de tabla
  return (
    <thead className='bg-gray-50 border-b border-gray-200'>
      <tr>
        {header.map((content, index) => (
          <th
            key={index}
            className='px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'
          >
            {content}
          </th>
        ))}
        {withAction && <th className='px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>Acción</th>}
      </tr>
    </thead>
  );
}

//propiedades de cuerpo de tabla
interface TableBodyProps<T extends BaseModel> {
  body: T[],
  action?: "list" | "delete" | "navigate" | "actions"
  func?: (id: string) => void
  onEdit?: (id: string) => void
}

//subcomponente body
function TableBody<T extends BaseModel>({ body, action, func, onEdit }:TableBodyProps<T>){
  if(action == "delete" && func){
    return (
      <tbody className='divide-y divide-gray-100'>
        {body.map((row) => (
          <tr key={row.id} className='hover:bg-gray-50 transition-colors' data-id={row.id}>
            <RowData key={row.id} data={row} />
            <td className='px-4 py-3 align-middle'>
              <DeleteButton action={() => func(row.id)}/>
            </td>
          </tr>
        ))}
      </tbody>
    );
  }

  if(action == "navigate" && func){
    return (
      <tbody className='divide-y divide-gray-100'>
        {body.map((row) => (
          <tr key={row.id} className='hover:bg-gray-50 transition-colors' data-id={row.id}>
            <RowData key={row.id} data={row} />
            <td className='px-4 py-3 align-middle'>
              <Button text="revisar" action={() => func(row.id)}/>
            </td>
          </tr>
        ))}
      </tbody>
    );
  }

  if(action == "actions"){
    return (
      <tbody className='divide-y divide-gray-100'>
        {body.map((row) => (
          <tr key={row.id} className='hover:bg-gray-50 transition-colors' data-id={row.id}>
            <RowData key={row.id} data={row} />
            <td className='px-4 py-3 align-middle'>
              <div className='flex gap-2'>
                {onEdit && (
                  <button
                    onClick={() => onEdit(row.id)}
                    className='p-1.5 rounded-md text-blue-500 hover:bg-blue-50 cursor-pointer transition-colors'
                    title='Editar'
                  >
                    <Pencil className='w-4 h-4' />
                  </button>
                )}
                {func && (
                  <button
                    onClick={() => func(row.id)}
                    className='p-1.5 rounded-md text-red-500 hover:bg-red-50 cursor-pointer transition-colors'
                    title='Dar de baja'
                  >
                    <Trash2 className='w-4 h-4' />
                  </button>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    );
  }

  return (
    <tbody className='divide-y divide-gray-100'>
      {body.map((row) => (
        <tr key={row.id} className='hover:bg-gray-50 transition-colors' data-id={row.id}>
          <RowData key={row.id} data={row} />
        </tr>
      ))}
    </tbody>
  );
}

//propiedades de tabla
interface TableProps<T extends BaseModel> {
  header: string[]
  body: T[],
  action?: "list" | "delete" | "navigate" | "actions"
  func?: (id: string) => void
  onEdit?: (id: string) => void
}

//componente de tabla
export function Table<T extends BaseModel>({ header, body, action = "list", func, onEdit }: TableProps<T>) {
  return (
    <div className='overflow-x-auto rounded-lg border border-gray-200'>
      <table className='min-w-full table-auto text-left text-sm'>
        <TableHeader header={header} withAction={action != "list"}/>
        {body.length ?
          <TableBody body={body} action={action} func={func} onEdit={onEdit}/>
          : <tbody>
              <tr>
                <td
                  colSpan={header.length}
                  className='px-4 py-8 text-center text-gray-400 text-sm'
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
