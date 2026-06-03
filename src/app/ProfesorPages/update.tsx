import Update from "../CrudActions/Update"
import HomeLayout from "../../components/ui/HomeLayout"
import ReturnButton from "../../components/interactives/buttons/ReturnButton"
import { PROFESORHEADERS } from "../../utils/Headers"
import Modal from "../../components/ui/Modals"
import { useState } from "react"
import type { BaseModel, ProfesorModel } from "../../interfaces/Models"
import PageBar from "../../components/ui/pageBar"
import debounce from "../../utils/Debounce"
import { useSearchParams } from "react-router-dom"
import { useTeachers } from "../../hooks/queries/useTeachers"
import { useUpdateTeacher } from "../../hooks/mutations/useTeacherMutations"

function UpdateProf() {
    const [openSuccess, setOpenSuccess] = useState(false)
    const [openFail, setOpenFail] = useState(false)
    const [current, setCurrent] = useState<ProfesorModel | undefined>()
    const [searchParams, setSearchParams] = useSearchParams()
    const page = Number(searchParams.get('page') ?? 0)
    const { data } = useTeachers(page)
    const { mutate: update } = useUpdateTeacher()

    const onSearch = (id: string) => {
        setCurrent(data?.data.find(t => t.id === id))
    }

    const onUpdate = (updated: BaseModel) => {
        debounce(() => {
            update(updated as ProfesorModel, {
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
            <HomeLayout title="Modulo asesor">
                <Update
                    module='asesor'
                    entity={current}
                    all={data?.data ?? []}
                    headers={PROFESORHEADERS}
                    onSearch={onSearch}
                    onUpdate={onUpdate}
                />
                <PageBar
                    current={page}
                    total={data?.total ?? 0}
                    onChange={(p: number) => setSearchParams({ page: String(p) })}
                />
                <ReturnButton path="/asesor/" />
            </HomeLayout>
            <Modal title="Asesor actualizado" message="los datos del asesor han sido actualizados" type="success" isOpen={openSuccess} onClose={() => setOpenSuccess(false)} />
            <Modal title="Error al actualizar" message="el asesor no ha sido actualizado" type="failure" isOpen={openFail} onClose={() => setOpenFail(false)} />
        </>
    )
}

export default UpdateProf
