import Table from '../../componets/tables/Table'
import QueryInput from '../../componets/utils/Inputs/QueryInput'
import type {
  AlumnoConfig,
  ProfesorConfig,
  ProgramaConfig
} from '../../interfaces/ModelsInterfaces'
import { generateTableData } from '../../utils/generateTableData'

type PropsDeletePage = {
  entity: string
  headers: string[]
  body: AlumnoConfig[] | ProfesorConfig[] | ProgramaConfig[] // modelos
  onSearch: (value: string) => void
  onDelete: (id: string) => void
}

interface RowData<T = any> {
  id: string
  raw: T
  cells: React.ReactNode[]
}

function generateDeleteTableData<T> (
  data: T[],
  getId: (row: T) => string,
  onDelete: (id: string) => void
): RowData<T>[] {
  return data.map(element => {
    const row: React.ReactNode[] = []

    Object.keys(element).forEach(key => {
      const value = element[key as keyof T]

      row.push(
        <p key={key} className='py-1 px-3'>
          {String(value)}
        </p>
      )
    })

    // Botón de eliminación
    row.push(
      <button
        key='delete'
        onClick={() => onDelete(getId(element))}
        className='w-full bg-red-600 text-white rounded-sm p-2 hover:cursor-pointer hover:bg-red-700'
      >
        Dar baja
      </button>
    )

    return {
      id: getId(element),
      raw: element,
      cells: row
    }
  })
}

export function Delete ({
  entity,
  headers,
  body,
  onDelete,
  onSearch
}: PropsDeletePage) {
  return (
    <>
      <QueryInput placeholder={`Buscar ${entity}`} action={onSearch} />
      <Table
        header={headers.concat('Acciones')}
        body={generateDeleteTableData(body as any[], item => item.id, onDelete)}
      />
    </>
  )
}

export default Delete
