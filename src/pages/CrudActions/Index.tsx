import Table from '../../components/tables/Table'
import type { IndexParameters } from '../../interfaces/CRUDInterfaces'

function Index ({ headers, data }: IndexParameters) {
  return (
    <Table
      header={headers}
      body={data}
    />
  )
}

export default Index
