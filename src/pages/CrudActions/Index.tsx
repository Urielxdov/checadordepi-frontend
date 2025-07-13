import type React from 'react'
import Table from '../../componets/tables/Table'
import QueryInput from '../../componets/utils/Inputs/QueryInput'
import type {
  AlumnoConfig,
  ProfesorConfig,
  ProgramaConfig
} from '../../interfaces/ModelsInterfaces'

export interface IndexParameters {
  headers: Array<string>
  data: Array<AlumnoConfig | ProfesorConfig | ProgramaConfig>
  action: (value: string) => void
}

function Index ({ headers, data, action }: IndexParameters) {
  const adaptedData = () => {
    const mappedData: React.ReactNode[][] = []
    data.forEach(element => {
      const row: React.ReactNode[] = []

      Object.keys(element).forEach(key => {
        row.push(element[key as keyof typeof element])
      })

      mappedData.push(row)
    })
    return mappedData
  }

  return (
    <>
      dswadsdsfsdf
      <QueryInput action={action} placeholder='Buscar' />
      <Table header={headers} body={adaptedData()} />
    </>
  )
}

export default Index
