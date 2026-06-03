import ReturnButton from "../../components/interactives/buttons/ReturnButton"
import HomeLayout from "../../components/ui/HomeLayout"
import { Table } from "../../components/ui/tables/Table"
import { ALUMNOHEADERS } from "../../utils/Headers"
import { useParams } from "react-router-dom"
import Form from "../../components/interactives/forms/Form"
import TextArea from "../../components/interactives/inputs/textarea"
import Button from "../../components/interactives/buttons/Button"
import { useStudent } from "../../hooks/queries/useStudents"

export default function JustifyOneAlu() {
    const { id } = useParams<{ id: string }>()
    const { data: alumno } = useStudent(id ?? '')

    if (!alumno) {
        return (
            <HomeLayout title="Incidencias">
                <p className="text-center">sin registro</p>
                <ReturnButton path="/alumno/" />
            </HomeLayout>
        )
    }

    return (
        <HomeLayout title="Incidencias">
            <Table header={ALUMNOHEADERS} body={[alumno]} action="list" />
            <Form id="justify" onSubmit={() => {}}>
                <TextArea label="Justificacion" name="justificacion" maxLength={256} change={() => {}} />
                <Button text="justificar" submit={true} action={() => {}} />
            </Form>
            <ReturnButton path="/alumno/" />
        </HomeLayout>
    )
}
