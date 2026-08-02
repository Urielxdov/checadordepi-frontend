import Delete from "../CrudActions/Delete"
import HomeLayout from "../../components/ui/HomeLayout"
import ReturnButton from "../../components/interactives/buttons/ReturnButton"
import { PROGRAMAHEADERS } from "../../utils/Headers"
import Modal from "../../components/ui/Modals"
import { useState } from "react"
import PageBar from "../../components/ui/pageBar"
import debounce from "../../utils/Debounce"
import { useSearchParams } from "react-router-dom"
import { usePrograms } from "../../hooks/queries/usePrograms"
import { useDeleteProgram } from "../../hooks/mutations/useProgramMutations"
import type { ProgramaModel } from "../../interfaces/Models"

function DeleteProg() {
    const [openSuccess, setOpenSuccess] = useState(false)
    const [openFail, setOpenFail] = useState(false)
    const [current, setCurrent] = useState<ProgramaModel | undefined>()
    const [searchParams, setSearchParams] = useSearchParams()
    const page = Number(searchParams.get('page') ?? 0)
    const { data } = usePrograms(page)
    const { mutate: remove } = useDeleteProgram()

    const onSearch = (id: string) => {
        setCurrent(data?.data.find(p => p.id === id))
    }

    const drop = (id: string) => {
        debounce(() => {
            remove(id, {
                onSuccess: (result) => {
                    if (result.success) { setOpenSuccess(true); setCurrent(undefined) }
                    else setOpenFail(true)
                },
                onError: () => setOpenFail(true)
            })
        }, 500)()
    }

    return (
        <>
            <HomeLayout title="Modulo programa">
                <Delete
                    module="programa"
                    headers={PROGRAMAHEADERS}
                    entity={current}
                    all={data?.data ?? []}
                    onSearch={onSearch}
                    onDelete={drop}
                />
                <PageBar
                    current={page}
                    total={data?.total ?? 0}
                    onChange={(p: number) => setSearchParams({ page: String(p) })}
                />
                <ReturnButton path="/programa/" />
            </HomeLayout>
            <Modal title="Programa eliminado" message="el programa ha sido eliminado con exito" type="success" isOpen={openSuccess} onClose={() => setOpenSuccess(false)} />
            <Modal title="Error al eliminar" message="el programa no ha sido eliminado" type="failure" isOpen={openFail} onClose={() => setOpenFail(false)} />
        </>
    )
}

export default DeleteProg
