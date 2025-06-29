import { useEffect, useState } from "react";
import SearchBar from "../../componets/utils/Inputs/searchBar";
import Button from "../../componets/utils/buttons/Button";
import HomeLayout from "../Layouts/HomeLayout";
import Table from "../../componets/tables/Table";
import { type DeleteParameters } from "../../interfaces/CRUDInterfaces";

function Delete({title, module, headers, entity, onDelete, onSearch}:DeleteParameters){
    //estado para busqueda
    const [searchText, setSearch] = useState('');

    //effect para montar el alumno
    useEffect(()=>{
        if(searchText!=''){
            //busqueda en el api
            onSearch(searchText);
        }
    },[searchText]);

    if(!entity){
        return (
            <HomeLayout title={title}>
                <h1 className="font-bold text-xl">Eliminar {module}</h1>
                <SearchBar
                    tip="numero de control"
                    onSearch={setSearch}
                />
                no hay registros aun
            </HomeLayout>
        );
    }else{
        return (
            <HomeLayout title={title}>
                <h1 className="font-bold text-xl">Eliminar {module}</h1>
                <SearchBar
                    tip="numero de control"
                    onSearch={setSearch}
                />
                <div className="flex flex-col">
                    <h2 className="font-bold text-lg">Datos del {module}</h2>
                    <Table
                        header={headers}
                        body={[entity.toArray()]}
                    />
                </div>
                <Button
                    text="eliminar"
                    action={() => {
                        //eliminar alumno
                        onDelete();
                    }}
                    submit={false}
                    styles="p-1 text-white bg-red-500 rounded-sm max-w-20 mx-auto"
                />
            </HomeLayout>
        );
    }
}

export default Delete;