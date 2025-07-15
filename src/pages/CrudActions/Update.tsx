import QueryInput from '../../componets/utils/Inputs/QueryInput'

import type {
  AlumnoConfig,
  ProfesorConfig,
  ProgramaConfig
} from '../../interfaces/ModelsInterfaces'
import Table from '../../componets/tables/Table'
import { generateTableData } from '../../utils/generateTableData'

export interface FieldProps {
  label: string
  name: string
  type: string
  maxlength?: number
  minlength?: number
  value?: string | File
}

export interface UpdateParameters {
  module: string
  body: AlumnoConfig[] | ProfesorConfig[] | ProgramaConfig[] // modelos
  headers: Array<string>
  onSearch: (s: string) => void | ((s: number) => void)
  onUpdate: (formData: FormData) => void
}
function Update ({
  module,
  body,
  onSearch,
  onUpdate,
  headers
}: UpdateParameters) {
  const update = (rowData: AlumnoConfig | ProfesorConfig | ProgramaConfig) => {
    const formData = new FormData()
    Object.entries(rowData).forEach(([key, value]) => {
      formData.append(key, String(value))
    })

    console.log(formData)

    onUpdate(formData)
  }

  if (!body) {
    return (
      <>
        <QueryInput placeholder={'buscar ' + module} action={onSearch} />
        sin registros
      </>
    )
  } else {
    return (
      <>
        <QueryInput placeholder={'buscar ' + module} action={onSearch} />
        <Table
          header={headers}
          body={generateTableData(body, item => item.id, update)}
        />
      </>
    )
  }
}

export default Update
