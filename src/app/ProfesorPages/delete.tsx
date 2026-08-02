import Delete from "../CrudActions/Delete"
import HomeLayout from "../../components/ui/HomeLayout"
import ReturnButton from "../../components/interactives/buttons/ReturnButton"
import { PROFESORHEADERS } from "../../utils/Headers"
import Modal from "../../components/ui/Modals"
import { useState } from "react"
import debounce from "../../utils/Debounce"
import PageBar from "../../components/ui/pageBar"
import { useSearchParams } from "react-router-dom"
import { useTeachers } from "../../hooks/queries/useTeachers"
import { useDeleteTeacher } from "../../hooks/mutations/useTeacherMutations"
import type { ProfesorModel } from "../../interfaces/Models"

function DeleteProf() {
    const [openSuccess, setOpenSuccess] = useState(false)
    const [openFail, setOpenFail] = useState(false)
    const [current, setCurrent] = useState<ProfesorModel | undefined>()
    const [searchParams, setSearchParams] = useSearchParams()
    const page = Number(searchParams.get('page') ?? 0)
    const { data } = useTeachers(page)
    const { mutate: remove } = useDeleteTeacher()

    const onSearch = (id: string) => {
        setCurrent(data?.data.find(t => t.id === id))
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
            <HomeLayout title="Modulo asesor">
                <Delete
                    module="asesor"
                    headers={PROFESORHEADERS}
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
                <ReturnButton path="/asesor/" />
            </HomeLayout>
            <Modal title="Asesor eliminado" message="el asesor ha sido eliminado con exito" type="success" isOpen={openSuccess} onClose={() => setOpenSuccess(false)} />
            <Modal title="Error al eliminar" message="el asesor no ha sido eliminado" type="failure" isOpen={openFail} onClose={() => setOpenFail(false)} />
        </>
    )
}

export default DeleteProf
