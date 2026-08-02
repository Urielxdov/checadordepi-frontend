import ReturnButton from "../../components/interactives/buttons/ReturnButton"
import Create from "../CrudActions/Create"
import HomeLayout from "../../components/ui/HomeLayout"
import { getFieldsAlu } from "../../utils/Fields"
import type { AlumnoModel } from "../../interfaces/Models"
import { useForm } from "../../hooks/reducers/FormReducer"
import Modal from "../../components/ui/Modals"
import { useState } from "react"
import type { SelectItem } from "../../interfaces/httpModels"
import debounce from "../../utils/Debounce"
import { useCreateStudent } from "../../hooks/mutations/useStudentMutations"
import { useTeachersSelect } from "../../hooks/queries/useTeachers"
import { useProgramsSelect } from "../../hooks/queries/usePrograms"

function CreateAlu() {
    const [openSuccess, setOpenSuccess] = useState(false)
    const [openFail, setOpenFail] = useState(false)
    const { state, handleChange, resetForm } = useForm('Alumno')
    const { mutate: create } = useCreateStudent()
    const { data: teacherItems } = useTeachersSelect()
    const { data: programItems } = useProgramsSelect()

    const itemsPf: SelectItem[] = [
        { key: "default", fullName: "-- seleccione un profesor --" },
        ...(teacherItems ?? [])
    ]
    const itemsPr: SelectItem[] = [
        { key: "default", fullName: "-- seleccione un programa --" },
        ...(programItems ?? [])
    ]

    const onSubmit = debounce(() => {
        const alumno = state.data as AlumnoModel
        alumno.status = "Activo"
        create(
            { student: alumno, foto: alumno.foto as File },
            {
                onSuccess: (result) => {
                    if (result.success) setOpenSuccess(true)
                    else setOpenFail(true)
                    resetForm()
                },
                onError: () => { setOpenFail(true); resetForm() }
            }
        )
    }, 500)

    return (
        <>
            <HomeLayout title="Modulo Alumno">
                <Create
                    module="Alumno"
                    fields={getFieldsAlu(state.data as AlumnoModel)}
                    itemsPf={itemsPf}
                    itemsPr={itemsPr}
                    onSubmit={onSubmit}
                    onChange={handleChange}
                />
                <ReturnButton path="/alumno/" />
            </HomeLayout>
            <Modal title="Alumno creado" message="el alumno ha sido creado con exito" type="success" isOpen={openSuccess} onClose={() => setOpenSuccess(false)} />
            <Modal title="Error al crear" message="el alumno no ha sido creado" type="failure" isOpen={openFail} onClose={() => setOpenFail(false)} />
        </>
    )
}

export default CreateAlu
