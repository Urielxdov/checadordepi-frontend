import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { ALUMNOHEADERS } from "../../utils/Headers"
import ReturnButton from "../../components/interactives/buttons/ReturnButton"
import HomeLayout from "../../components/ui/HomeLayout"
import Index from "../CrudActions/Index"
import PageBar from "../../components/ui/pageBar"
import { useStudents } from "../../hooks/queries/useStudents"
import type { AlumnoModel } from "../../interfaces/Models"

function IndexAlu() {
    const [searchParams, setSearchParams] = useSearchParams()
    const page = Number(searchParams.get('page') ?? 0)
    const [current, setCurrent] = useState<AlumnoModel | undefined>()
    const { data, isLoading } = useStudents(page)

    const onSearch = (id: string) => {
        setCurrent(data?.data.find(s => s.id === id))
    }

    if (isLoading) return (
        <HomeLayout title="Lista de alumnos">
            <p className="text-center">Cargando...</p>
        </HomeLayout>
    )

    return (
        <HomeLayout title="Lista de alumnos">
            <Index
                headers={ALUMNOHEADERS}
                body={data?.data ?? []}
                onSearch={onSearch}
                entity={current}
            />
            <PageBar
                current={page}
                total={data?.total ?? 0}
                onChange={(p: number) => setSearchParams({ page: String(p) })}
            />
            <ReturnButton path="/alumno/" />
        </HomeLayout>
    )
}

export default IndexAlu
