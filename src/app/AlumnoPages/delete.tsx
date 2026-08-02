import Delete from "../CrudActions/Delete"
import HomeLayout from "../../components/ui/HomeLayout"
import ReturnButton from "../../components/interactives/buttons/ReturnButton"
import { ALUMNOHEADERS } from "../../utils/Headers"
import Modal from "../../components/ui/Modals"
import { useState } from "react"
import PageBar from "../../components/ui/pageBar"
import debounce from "../../utils/Debounce"
import { useSearchParams } from "react-router-dom"
import { useStudents } from "../../hooks/queries/useStudents"
import { useDeleteStudent } from "../../hooks/mutations/useStudentMutations"
import type { AlumnoModel } from "../../interfaces/Models"

function DeleteAlu() {
    const [openSuccess, setOpenSuccess] = useState(false)
    const [openFail, setOpenFail] = useState(false)
    const [current, setCurrent] = useState<AlumnoModel | undefined>()
    const [searchParams, setSearchParams] = useSearchParams()
    const page = Number(searchParams.get('page') ?? 0)
    const { data } = useStudents(page)
    const { mutate: remove } = useDeleteStudent()

    const onSearch = (id: string) => {
        setCurrent(data?.data.find(s => s.id === id))
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
            <HomeLayout title="Modulo Alumno">
                <Delete
                    module="alumno"
                    headers={ALUMNOHEADERS}
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
                <ReturnButton path="/alumno/" />
            </HomeLayout>
            <Modal title="Alumno eliminado" message="el alumno ha sido eliminado con exito" type="success" isOpen={openSuccess} onClose={() => setOpenSuccess(false)} />
            <Modal title="Error al eliminar" message="el alumno no ha sido eliminado" type="failure" isOpen={openFail} onClose={() => setOpenFail(false)} />
        </>
    )
}

export default DeleteAlu
