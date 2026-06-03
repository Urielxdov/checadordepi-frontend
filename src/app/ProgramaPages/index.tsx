import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { PROGRAMAHEADERS } from "../../utils/Headers"
import HomeLayout from "../../components/ui/HomeLayout"
import ReturnButton from "../../components/interactives/buttons/ReturnButton"
import Index from "../CrudActions/Index"
import PageBar from "../../components/ui/pageBar"
import { usePrograms } from "../../hooks/queries/usePrograms"
import type { ProgramaModel } from "../../interfaces/Models"

function IndexProg() {
    const [searchParams, setSearchParams] = useSearchParams()
    const page = Number(searchParams.get('page') ?? 0)
    const [current, setCurrent] = useState<ProgramaModel | undefined>()
    const { data, isLoading } = usePrograms(page)

    const onSearch = (id: string) => {
        setCurrent(data?.data.find(p => p.id === id))
    }

    if (isLoading) return (
        <HomeLayout title="Lista de programas">
            <p className="text-center">Cargando...</p>
        </HomeLayout>
    )

    return (
        <HomeLayout title="Lista de programas">
            <Index
                headers={PROGRAMAHEADERS}
                body={data?.data ?? []}
                onSearch={onSearch}
            />
            <PageBar
                current={page}
                total={data?.total ?? 0}
                onChange={(p: number) => setSearchParams({ page: String(p) })}
            />
            <ReturnButton path="/programa/" />
        </HomeLayout>
    )
}

export default IndexProg
