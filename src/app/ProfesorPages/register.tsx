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

function CreateProf() {
    const [openSuccess, setOpenSuccess] = useState(false)
    const [openFail, setOpenFail] = useState(false)
    const { state, handleChange, resetForm } = useForm('Profesor')
    const { mutate: create } = useCreateTeacher()

    const submit = debounce(() => {
        const profesor = state.data as ProfesorModel
        profesor.status = "Activo"
        create(profesor, {
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
            <HomeLayout title="Modulo asesor">
                <Create module="asesor" fields={getFieldsProf(state.data as ProfesorModel)} onSubmit={submit} onChange={handleChange} />
                <ReturnButton path="/asesor/" />
            </HomeLayout>
            <Modal title="Asesor registrado" message="el asesor ha sido registrado con exito" type="success" isOpen={openSuccess} onClose={() => setOpenSuccess(false)} />
            <Modal title="Error al registrar" message="el asesor no ha sido registrado" type="failure" isOpen={openFail} onClose={() => setOpenFail(false)} />
        </>
    )
}

export default CreateProf
