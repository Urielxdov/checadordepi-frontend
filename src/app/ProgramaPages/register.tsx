import Create from "../CrudActions/Create"
import HomeLayout from "../../components/ui/HomeLayout"
import ReturnButton from "../../components/interactives/buttons/ReturnButton"
import { getFieldsProg } from "../../utils/Fields"
import { useForm } from "../../hooks/reducers/FormReducer"
import type { ProgramaModel } from "../../interfaces/Models"
import Modal from "../../components/ui/Modals"
import { useState } from "react"
import debounce from "../../utils/Debounce"
import { useCreateProgram } from "../../hooks/mutations/useProgramMutations"
import { errorMessage, getErrorFields } from "../../services/apiErrors"
import { mapBackendFieldErrors, setFieldError, type FieldErrors, validateCreateField, validateCreateForm } from "../../utils/formValidation"

function CreateProg() {
    const [openSuccess, setOpenSuccess] = useState(false)
    const [openFail, setOpenFail] = useState(false)
    const [failMessage, setFailMessage] = useState("el programa no ha sido creado")
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
    const { state, handleChange, resetForm } = useForm('Programa')
    const { mutate: create } = useCreateProgram()

    const onChange = (key: string, value: any) => {
        handleChange(key, value)
        setFieldErrors(errors => setFieldError(errors, key, validateCreateField(getFieldsProg(state.data as ProgramaModel), "Programa", key, value)))
    }

    const submit = debounce(() => {
        const programa = state.data as ProgramaModel
        const errors = validateCreateForm(getFieldsProg(programa), programa as unknown as Record<string, unknown>, "Programa")
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors)
            setFailMessage("Corrige los campos marcados antes de registrar el programa.")
            setOpenFail(true)
            return
        }

        programa.status = "Activo"
        create(programa, {
            onSuccess: (result) => {
                if (result.success) {
                    setFieldErrors({})
                    setOpenSuccess(true)
                    resetForm()
                } else {
                    setFailMessage(result.message || "el programa no ha sido creado")
                    setOpenFail(true)
                }
            },
            onError: (error) => {
                setFieldErrors(mapBackendFieldErrors(getErrorFields(error)))
                setFailMessage(errorMessage(error, "el programa no ha sido creado"))
                setOpenFail(true)
            }
        })
    }, 500)

    return (
        <>
            <HomeLayout title="Modulo programa">
                <Create module="programa" fields={getFieldsProg(state.data as ProgramaModel)} errors={fieldErrors} onSubmit={submit} onChange={onChange} />
                <ReturnButton path="/programa/" />
            </HomeLayout>
            <Modal title="Programa creado" message="el programa ha sido creado con exito" type="success" isOpen={openSuccess} onClose={() => setOpenSuccess(false)} />
            <Modal title="Error al crear" message={failMessage} type="failure" isOpen={openFail} onClose={() => setOpenFail(false)} />
        </>
    )
}

export default CreateProg
