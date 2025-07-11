import QueryInput from "../../componets/utils/Inputs/QueryInput";
import { type UpdateParameters } from "../../interfaces/CRUDInterfaces";
import Table from "../../componets/tables/Table";
import Button from "../../componets/utils/buttons/Button";
import { parseObjectToRow } from "../../utils/ParserObjects";

function Update({module, entity, headers, onSearch, onUpdate}:UpdateParameters){
    //manejo de actualizacion
    const getChanges = () =>{
        //encontrar la tabla
        const table = document.getElementById("table") as HTMLTableElement | undefined;

        //contenedor de datos
        const changes = [] as Array<string>;

        //validacion de existencia (para que ts no llore)
        if(table){
            //iterar sobre los renglones
            [...table.rows].forEach((row, i) => {
                //iterar sobre celdas
                [...row.cells].forEach((cell) => {
                    //celda de datos
                    if(i>0){
                        changes.push(cell.textContent as string);
                    }
                })
            })

            //paso al padre
            onUpdate(changes);
        }
    }

    if(!entity){
        return (
            <>
                <QueryInput placeholder={'buscar '+module} action={onSearch}/>
                sin registros
            </>
        );
    }else{
        return (
        <>
            <QueryInput placeholder={'buscar '+module} action={onSearch}/>
            <Table
                header={headers}
                body={[parseObjectToRow(entity, true)]}
            />
            <Button
                text="actualizar"
                action={getChanges}
                submit={false}
                styles="p-1 text-white bg-green-500 rounded-sm
                hover: bg-green-600 hover: cursor-pointer
                "
            />
        </>
        );
    }
}

export default Update;