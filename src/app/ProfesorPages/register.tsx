import Create from "../CrudActions/Create"
import HomeLayout from "../../components/ui/HomeLayout"
import ReturnButton from "../../components/interactives/buttons/ReturnButton"
import { getFieldsProf } from "../../utils/Fields"
import type { ProfesorModel } from "../../interfaces/Models"
import Modal from "../../components/ui/Modals"
import { useState } from "react"
import { useForm } from "../../hooks/reducers/FormReducer"
import debounce from "../../utils/Debounce"
import { useCreateTeacher } from "../../hooks/mutations/useTeacherMutations"
import { errorMessage, getErrorFields } from "../../services/apiErrors"
import { mapBackendFieldErrors, setFieldError, type FieldErrors, validateCreateField, validateCreateForm } from "../../utils/formValidation"

function CreateProf() {
    const [openSuccess, setOpenSuccess] = useState(false)
    const [openFail, setOpenFail] = useState(false)
    const [failMessage, setFailMessage] = useState("el asesor no ha sido registrado")
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
    const { state, handleChange, resetForm } = useForm('Profesor')
    const { mutate: create } = useCreateTeacher()

    const onChange = (key: string, value: any) => {
        handleChange(key, value)
        setFieldErrors(errors => setFieldError(errors, key, validateCreateField(getFieldsProf(state.data as ProfesorModel), "Profesor", key, value)))
    }

    const submit = debounce(() => {
        const profesor = state.data as ProfesorModel
        const errors = validateCreateForm(getFieldsProf(profesor), profesor as unknown as Record<string, unknown>, "Profesor")
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors)
            setFailMessage("Corrige los campos marcados antes de registrar el asesor.")
            setOpenFail(true)
            return
        }

        profesor.status = "Activo"
        create(profesor, {
            onSuccess: (result) => {
                if (result.success) {
                    setFieldErrors({})
                    setOpenSuccess(true)
                    resetForm()
                } else {
                    setFailMessage(result.message || "el asesor no ha sido registrado")
                    setOpenFail(true)
                }
            },
            onError: (error) => {
                setFieldErrors(mapBackendFieldErrors(getErrorFields(error)))
                setFailMessage(errorMessage(error, "el asesor no ha sido registrado"))
                setOpenFail(true)
            }
        })
    }, 500)

    return (
        <>
            <HomeLayout title="Modulo asesor">
                <Create module="asesor" fields={getFieldsProf(state.data as ProfesorModel)} errors={fieldErrors} onSubmit={submit} onChange={onChange} />
                <ReturnButton path="/asesor/" />
            </HomeLayout>
            <Modal title="Asesor registrado" message="el asesor ha sido registrado con exito" type="success" isOpen={openSuccess} onClose={() => setOpenSuccess(false)} />
            <Modal title="Error al registrar" message={failMessage} type="failure" isOpen={openFail} onClose={() => setOpenFail(false)} />
        </>
    )
}

export default CreateProf
