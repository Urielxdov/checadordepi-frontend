import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { PROFESORHEADERS } from "../../utils/Headers"
import HomeLayout from "../../components/ui/HomeLayout"
import ReturnButton from "../../components/interactives/buttons/ReturnButton"
import Index from "../CrudActions/Index"
import PageBar from "../../components/ui/pageBar"
import { useTeachers } from "../../hooks/queries/useTeachers"
import type { ProfesorModel } from "../../interfaces/Models"

function IndexProf() {
    const [searchParams, setSearchParams] = useSearchParams()
    const page = Number(searchParams.get('page') ?? 0)
    const [current, setCurrent] = useState<ProfesorModel | undefined>()
    const { data, isLoading } = useTeachers(page)

    const onSearch = (id: string) => {
        setCurrent(data?.data.find(t => t.id === id))
    }

    if (isLoading) return (
        <HomeLayout title="Lista de asesores">
            <p className="text-center">Cargando...</p>
        </HomeLayout>
    )

    return (
        <HomeLayout title="Lista de asesores">
            <Index
                headers={PROFESORHEADERS}
                body={data?.data ?? []}
                onSearch={onSearch}
                entity={current}
            />
            <PageBar
                current={page}
                total={data?.total ?? 0}
                onChange={(p: number) => setSearchParams({ page: String(p) })}
            />
            <ReturnButton path="/asesor/" />
        </HomeLayout>
    )
}

export default IndexProf
