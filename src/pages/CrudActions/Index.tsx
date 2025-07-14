import Table from '../../componets/tables/Table'
import QueryInput from '../../componets/utils/Inputs/QueryInput'
import type {
  AlumnoConfig,
  ProfesorConfig,
  ProgramaConfig
} from '../../interfaces/ModelsInterfaces'
import { generateTableData } from '../../utils/generateTableData'

export interface IndexParameters {
  headers: Array<string>
  data: Array<AlumnoConfig | ProfesorConfig | ProgramaConfig>
  action: (value: string) => void
}

function Index ({ headers, data, action }: IndexParameters) {
  return (
    <>
      <QueryInput action={action} placeholder='Buscar' />
      <Table
        header={headers}
        body={generateTableData(data, item => item.id, undefined, false)}
      />
    </>
  )
}

export default Index
