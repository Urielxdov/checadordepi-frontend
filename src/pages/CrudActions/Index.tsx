import HomeLayout from "../Layouts/HomeLayout";
import Table from "../../componets/tables/Table";
import { type IndexParameters } from "../../interfaces/CRUDInterfaces";

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