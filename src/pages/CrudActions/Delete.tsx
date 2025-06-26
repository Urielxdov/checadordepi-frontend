import Table from "../../componets/tables/Table";
import HomeLayout from "../Layouts/HomeLayout";
import QueryInput from "../../componets/utils/Inputs/QueryInput";


interface DeleteProps {
    headers: string[];
    body: React.ReactNode[][];
    entity: string;
    onDelete: (id:string) => void;
    onSearch: (query: string) => void;
}

export default function Delete({headers, body, entity, onDelete, onSearch}: DeleteProps) {
    return(
        <>
            <HomeLayout title={`Dar de baja ${entity}`}>
                <QueryInput
                    placeholder={`Buscar ${entity}`}
                    action={onSearch}
                />
                <Table
                    header={headers}
                    body={body}
                />
            </HomeLayout>
        </>
    )
}