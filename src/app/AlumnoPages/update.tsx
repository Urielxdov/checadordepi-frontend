import UpdateForm from "../CrudActions/UpdateForm"
import HomeLayout from "../../components/ui/HomeLayout"
import ReturnButton from "../../components/interactives/buttons/ReturnButton"
import { type AlumnoModel } from "../../interfaces/Models"
import Modal from "../../components/ui/Modals"
import { useEffect, useState } from "react"
import { getFieldsAlu } from "../../utils/Fields"
import { useForm } from "../../hooks/reducers/FormReducer"
import type { SelectItem } from "../../interfaces/httpModels"
import QueryInput from "../../components/interactives/inputs/QueryInput"
import CheckBox from "../../components/interactives/inputs/Checkbox"
import debounce from "../../utils/Debounce"
import { useSearchParams } from "react-router-dom"
import { useStudents } from "../../hooks/queries/useStudents"
import { useUpdateStudent } from "../../hooks/mutations/useStudentMutations"
import { useTeachersSelect } from "../../hooks/queries/useTeachers"
import { useProgramsSelect } from "../../hooks/queries/usePrograms"

function UpdateAlu() {
    const [openSuccess, setOpenSuccess] = useState(false)
    const [openFail, setOpenFail] = useState(false)
    const [check, setCheck] = useState(false)
    const [current, setCurrent] = useState<AlumnoModel | undefined>()
    const [searchParams] = useSearchParams()
    const page = Number(searchParams.get('page') ?? 0)
    const { data } = useStudents(page)
    const { mutate: update } = useUpdateStudent()
    const { data: teacherItems } = useTeachersSelect()
    const { data: programItems } = useProgramsSelect()
    const { state, handleChange, setValue, resetForm } = useForm("Alumno")

    const itemsPf: SelectItem[] = [
        { key: "default", fullName: "-- seleccione un profesor --" },
        ...(teacherItems ?? [])
    ]
    const itemsPr: SelectItem[] = [
        { key: "default", fullName: "-- seleccione un programa --" },
        ...(programItems ?? [])
    ]

    const onSearch = (id: string) => {
        setCurrent(data?.data.find(s => s.id === id))
    }

    useEffect(() => {
        if (current) setValue(current)
    }, [current])

    const onUpdate = debounce(() => {
        const alumno = state.data as AlumnoModel
        update(
            { student: alumno, foto: check ? alumno.foto as File : undefined },
            {
                onSuccess: (result) => {
                    if (result.success) setOpenSuccess(true)
                    else setOpenFail(true)
                    resetForm()
                    setCurrent(undefined)
                },
                onError: () => { setOpenFail(true); resetForm() }
            }
        )
    }, 500)

    if (!current) {
        return (
            <HomeLayout title="Modulo Alumno">
                <QueryInput action={onSearch} placeholder="buscar alumno" />
                <p className="text-center">sin registro</p>
                <ReturnButton path="/alumno/" />
            </HomeLayout>
        )
    }

    return (
        <>
            <HomeLayout title="Modulo Alumno">
                <QueryInput action={onSearch} placeholder="buscar alumno" />
                <UpdateForm
                    module="Alumno"
                    fields={check ? getFieldsAlu(state.data as AlumnoModel).slice(1) : getFieldsAlu(state.data as AlumnoModel).slice(1, 7)}
                    itemsPf={itemsPf}
                    itemsPr={itemsPr}
                    selectPf={(state.data as AlumnoModel).profesor}
                    selectPr={(state.data as AlumnoModel).programa}
                    onSubmit={onUpdate}
                    onChange={handleChange}
                />
                <CheckBox text="actualizar foto" onChange={setCheck} />
                <ReturnButton path="/alumno/" />
            </HomeLayout>
            <Modal title="Alumno actualizado" message="los datos del alumnos se han actualizado" type="success" isOpen={openSuccess} onClose={() => setOpenSuccess(false)} />
            <Modal title="Error al actualizar" message="el alumno no ha sido actualizado" type="failure" isOpen={openFail} onClose={() => setOpenFail(false)} />
        </>
    )
}

export default UpdateAlu
