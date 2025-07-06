import { useEffect, useState } from "react"
import Table from "../../componets/tables/Table"
import { parseObjectToRow } from "../../utils/ParserObjects"
import { Alumno } from "../../models/AlumnoModel"
import QueryInput from "../../componets/utils/Inputs/QueryInput"

type PropsDeletePage = {
  entity: string
  headers: string[]
  body: Alumno[] // objetos crudos, no nodos
  onSearch: (value: string) => void
  onDelete: (id: string) => void
}

export function Delete({ entity, headers, body, onDelete, onSearch }: PropsDeletePage) {
  const [currentRecords, setCurrentRecords] = useState<React.ReactNode[][]>([])

  useEffect(() => {
    setCurrentRecords(
      body ? body.map((obj: Alumno) =>
        parseObjectToRow(obj).concat([
          
          <button
            key="delete"
            onClick={() => onDelete(obj.id)}
            className="text-red-600 hover:underline"
          >
            Dar baja
          </button>
        ])
      )
      : []
    )
  }, [body, onDelete])

  return (
      <>
        <QueryInput placeholder={`Buscar ${entity}`} action={onSearch}/>
        <Table header={headers.concat("Acciones")} body={currentRecords} />
      </>
  )
}

export default Delete
