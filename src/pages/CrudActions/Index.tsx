import HomeLayout from "../Layouts/HomeLayout";
import Table from "../../componets/tables/Table";

interface IndexParameters {
    title: string,
    headers: Array<string>,
    data: Array<any>
}

function Index({title, headers, data}:IndexParameters){

    return (
        <HomeLayout title={title}>
            <Table
                header={headers}
                body={data}
            />
        </HomeLayout>
    );
}

export default Index;