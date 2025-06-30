import { useEffect, useState } from "react"
import Table from "../../componets/tables/Table"
import HomeLayout from "../Layouts/HomeLayout"
import { parseObjectToRow } from "../../utils/ParserObjects"
import type { Student } from "../../models/Student"
import QueryInput from "../../componets/utils/Inputs/QueryInput"

type PropsDeletePage = {
  entity: string
  headers: string[]
  body: Student[] // objetos crudos, no nodos
  onSearch: (value: string) => void
  onDelete: (id: string) => void
}

export function Delete({ entity, headers, body, onDelete, onSearch }: PropsDeletePage) {
  const [currentRecords, setCurrentRecords] = useState<React.ReactNode[][]>([])

  useEffect(() => {
    setCurrentRecords(
      body ? body.map((obj: Student) =>
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
    <HomeLayout title={`Dar baja ${entity}`}>
      <QueryInput placeholder={`Buscar ${entity}`} action={onSearch}/>
      <Table header={headers.concat("Acciones")} body={currentRecords} />
    </HomeLayout>
  )
}

export default Delete
