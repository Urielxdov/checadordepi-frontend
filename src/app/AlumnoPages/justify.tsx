import ReturnButton from "../../components/interactives/buttons/ReturnButton"
import HomeLayout from "../../components/ui/HomeLayout"
import { Table } from "../../components/ui/tables/Table"
import { ALUMNOHEADERS } from "../../utils/Headers"
import { useNavigate } from "react-router-dom"
import { useStudents } from "../../hooks/queries/useStudents"

export default function JustifyAlu() {
    const navigate = useNavigate()
    const { data } = useStudents(0)

    return (
        <HomeLayout title="Incidencias">
            <Table
                header={ALUMNOHEADERS}
                body={data?.data ?? []}
                action="navigate"
                func={(id) => { navigate("/alumno/justify/" + id) }}
            />
            <ReturnButton path="/alumno/" />
        </HomeLayout>
    )
}
