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
import { errorMessage, getErrorFields } from "../../services/apiErrors"
import { mapBackendFieldErrors, setFieldError, type FieldErrors, validateCreateField, validateCreateForm } from "../../utils/formValidation"

function CreateAlu() {
    const [openSuccess, setOpenSuccess] = useState(false)
    const [openFail, setOpenFail] = useState(false)
    const [failMessage, setFailMessage] = useState("el alumno no ha sido creado")
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
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

    const onChange = (key: string, value: any) => {
        handleChange(key, value)
        setFieldErrors(errors => setFieldError(errors, key, validateCreateField(getFieldsAlu(state.data as AlumnoModel), "Alumno", key, value)))
    }

    const onSubmit = debounce(() => {
        const alumno = state.data as AlumnoModel
        const errors = validateCreateForm(getFieldsAlu(alumno), alumno as unknown as Record<string, unknown>, "Alumno")
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors)
            setFailMessage("Corrige los campos marcados antes de registrar el alumno.")
            setOpenFail(true)
            return
        }

        alumno.status = "Activo"
        create(
            { student: alumno, foto: alumno.foto as File },
            {
                onSuccess: (result) => {
                    if (result.success) {
                        setFieldErrors({})
                        setOpenSuccess(true)
                        resetForm()
                    } else {
                        setFailMessage(result.message || "el alumno no ha sido creado")
                        setOpenFail(true)
                    }
                },
                onError: (error) => {
                    setFieldErrors(mapBackendFieldErrors(getErrorFields(error)))
                    setFailMessage(errorMessage(error, "el alumno no ha sido creado"))
                    setOpenFail(true)
                }
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
                    selectPf={(state.data as AlumnoModel).profesor || "default"}
                    selectPr={(state.data as AlumnoModel).programa || "default"}
                    errors={fieldErrors}
                    onSubmit={onSubmit}
                    onChange={onChange}
                />
                <ReturnButton path="/alumno/" />
            </HomeLayout>
            <Modal title="Alumno creado" message="el alumno ha sido creado con exito" type="success" isOpen={openSuccess} onClose={() => setOpenSuccess(false)} />
            <Modal title="Error al crear" message={failMessage} type="failure" isOpen={openFail} onClose={() => setOpenFail(false)} />
        </>
    )
}

export default CreateAlu
