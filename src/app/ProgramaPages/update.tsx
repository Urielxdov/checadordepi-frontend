import Update from "../CrudActions/Update"
import HomeLayout from "../../components/ui/HomeLayout"
import ReturnButton from "../../components/interactives/buttons/ReturnButton"
import { PROGRAMAHEADERS } from "../../utils/Headers"
import Modal from "../../components/ui/Modals"
import { useState } from "react"
import type { BaseModel, ProgramaModel } from "../../interfaces/Models"
import PageBar from "../../components/ui/pageBar"
import debounce from "../../utils/Debounce"
import { useSearchParams } from "react-router-dom"
import { usePrograms } from "../../hooks/queries/usePrograms"
import { useUpdateProgram } from "../../hooks/mutations/useProgramMutations"

function UpdateProg() {
    const [openSuccess, setOpenSuccess] = useState(false)
    const [openFail, setOpenFail] = useState(false)
    const [current, setCurrent] = useState<ProgramaModel | undefined>()
    const [searchParams, setSearchParams] = useSearchParams()
    const page = Number(searchParams.get('page') ?? 0)
    const { data } = usePrograms(page)
    const { mutate: update } = useUpdateProgram()

    const onSearch = (id: string) => {
        setCurrent(data?.data.find(p => p.id === id))
    }

    const onUpdate = (updated: BaseModel) => {
        debounce(() => {
            if (updated.status === "Permiso") updated.status = "Inactivo"
            update(updated as ProgramaModel, {
                onSuccess: (result) => {
                    if (result.success) setOpenSuccess(true)
                    else setOpenFail(true)
                },
                onError: () => setOpenFail(true)
            })
        }, 500)()
    }

    return (
        <>
            <HomeLayout title="Modulo programa">
                <Update
                    module='programa'
                    entity={current}
                    all={data?.data ?? []}
                    headers={PROGRAMAHEADERS}
                    onSearch={onSearch}
                    onUpdate={onUpdate}
                />
                <PageBar
                    current={page}
                    total={data?.total ?? 0}
                    onChange={(p: number) => setSearchParams({ page: String(p) })}
                />
                <ReturnButton path="/programa/" />
            </HomeLayout>
            <Modal title="Programa actualizado" message="los datos del programa han sido actualizados" type="success" isOpen={openSuccess} onClose={() => setOpenSuccess(false)} />
            <Modal title="Error al actualizar" message="el programa no ha sido actualizado" type="failure" isOpen={openFail} onClose={() => setOpenFail(false)} />
        </>
    )
}

export default UpdateProg
