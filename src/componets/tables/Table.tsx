import React from 'react'
import type { RowData } from '../../utils/generateTableData'

interface TableProps<T = any> {
  header: string[]
  body: RowData<T>[] | null
}

export default function Table<T> ({ header, body }: TableProps<T>) {
  if (header.length === 0) {
    return <div className='text-gray-600'>No hay datos para mostrar</div>
  }

  return (
    <div className='overflow-x-auto'>
      <table
        id='table'
        className='min-w-full table-auto border border-gray-300 text-left'
      >
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
          </tr>
        </thead>

        <tbody>
          {body && body.length > 0 ? (
            body.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                data-id={row.id}
                data-object={JSON.stringify(row.raw)} // cuidado: esto debe ser serializable
                className='odd:bg-white even:bg-gray-100'
              >
                {row.cells.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className='border border-gray-300 p-2 align-top'
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={header.length}
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
