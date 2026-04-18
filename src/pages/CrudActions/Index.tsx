import Table from '../../components/ui/tables/Table'

export interface IndexParameters {
    headers: Array<string>,
    data: Array<any>
}

function Index ({ headers, data }: IndexParameters) {
  return (
    <Table
      header={headers}
      body={data}
    />
  )
}

export default Index
