import QueryInput from "../../componets/utils/Inputs/QueryInput";
import { type UpdateParameters } from "../../interfaces/CRUDInterfaces";
import FunctionTable from "../../componets/tables/FunctionTable";

function Update({module, entity, headers, all, onSearch, onUpdate}:UpdateParameters){
    //manejo de actualizacion
    const getChanges = (e: React.MouseEvent<HTMLButtonElement>) =>{
        //evitar recargo de pagina
        e.preventDefault()

        //contenedor de datos
        const data = []

        //obtener el tr
        const tr = (e.target as HTMLElement).closest('tr');

        if(tr){
            //guardar el id viejo
            data.push(tr.getAttribute('data-id'));

            //obtener los datos cambiados
            const inputs = tr.getElementsByTagName('input');
            [...inputs].forEach(input => {
                data.push((input as HTMLInputElement).value)
            })

            //paso al padre
            onUpdate(data);
        }
    }

    if(!entity){
        return (
            <>
                <QueryInput placeholder={'buscar '+module} action={onSearch}/>
                <FunctionTable
                    type='UPDATE'
                    action={getChanges}
                    headers={headers}
                    body={all}
                />
            </>
        );
    }else{
        return (
        <>
            <QueryInput placeholder={'buscar '+module} action={onSearch}/>
            <FunctionTable
                type='UPDATE'
                action={getChanges}
                headers={headers}
                body={[entity]}
            />
        </>
        );
    }
}

export default Update;