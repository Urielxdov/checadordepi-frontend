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

function CreateProg() {
    const [openSuccess, setOpenSuccess] = useState(false)
    const [openFail, setOpenFail] = useState(false)
    const { state, handleChange, resetForm } = useForm('Programa')
    const { mutate: create } = useCreateProgram()

    const submit = debounce(() => {
        const programa = state.data as ProgramaModel
        programa.status = "Activo"
        create(programa, {
            onSuccess: (result) => {
                if (result.success) setOpenSuccess(true)
                else setOpenFail(true)
                resetForm()
            },
            onError: () => { setOpenFail(true); resetForm() }
        })
    }, 500)

    return (
        <>
            <HomeLayout title="Modulo programa">
                <Create module="programa" fields={getFieldsProg(state.data as ProgramaModel)} onSubmit={submit} onChange={handleChange} />
                <ReturnButton path="/programa/" />
            </HomeLayout>
            <Modal title="Programa creado" message="el programa ha sido creado con exito" type="success" isOpen={openSuccess} onClose={() => setOpenSuccess(false)} />
            <Modal title="Error al crear" message="el programa no ha sido creado" type="failure" isOpen={openFail} onClose={() => setOpenFail(false)} />
        </>
    )
}

export default CreateProg
