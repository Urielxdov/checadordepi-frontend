import Table from '../../componets/tables/Table'
import QueryInput from '../../componets/utils/Inputs/QueryInput'
import type {
  AlumnoConfig,
  ProfesorConfig,
  ProgramaConfig
} from '../../interfaces/ModelsInterfaces'
import type { RowData } from '../../utils/generateTableData'

type PropsDeletePage = {
  entity: string
  headers: string[]
  body: AlumnoConfig[] | ProfesorConfig[] | ProgramaConfig[] // modelos
  onSearch: (value: string) => void
  onDelete: (id: string) => void
}

export function Delete ({
  entity,
  headers,
  body,
  onDelete,
  onSearch
}: PropsDeletePage) {
  const adaptedData = () => {
    //contenedor
    const mappedData: RowData<[typeof body]>[] = []

    //pasar los registros a un renglon
    body.forEach(element => {
      const row: React.ReactNode[] = []

      Object.keys(element).forEach(key => {
        row.push(element[key as keyof typeof element])
      })

      //agregar boton de eliminar
      row.push(
        <button
          key='delete'
          onClick={() => onDelete(element.id)}
          className='w-full bg-red-600 text-white rounded-sm p-2 hover:cursor-pointer hover:bg-red-700'
        >
          Dar baja
        </button>
      )

      //nuevo row data
      const mappedRow = {} as RowData
      mappedRow.cells = row
      mappedData.push(mappedRow)
    })
  
    return mappedData
  }
  
  return (
    <>
      <QueryInput placeholder={`Buscar ${entity}`} action={onSearch} />
      <Table header={headers.concat('Acciones')} body={adaptedData()} />
    </>
  )
}

export default Delete
