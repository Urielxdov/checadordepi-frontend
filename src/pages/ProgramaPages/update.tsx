import { useEffect } from 'react'
import Update from '../CrudActions/Update'
import { usePrograms } from '../../hooks/custom/usePrograms'
import HomeLayout from '../Layouts/HomeLayout'
import ReturnButton from '../../componets/utils/buttons/ReturnButton'
import { PROGRAMAHEADERS } from '../../utils/Headers'

function UpdateProg(){
    //obtener el contexto
    const context = usePrograms();

    //si no hay regresar error
    if(!context){ return <div>No hay contexto!!!</div> }

    //obtener lo necesario
    const { state, searchProgram, updateProgram } = context

    //efecto para busqueda
    useEffect(() => {
        if(state.program){
            console.log("profesor encontrado")
        }else{
            console.log("profesor no encontrado")
        }
    },[state.program])

    //retorno de componente
    return (
        <HomeLayout title="Modulo profesor">
            <Update
                module='profesor'
                headers={PROGRAMAHEADERS}
                body={state.programs}
                onSearch={(s: string) => searchProgram(parseInt(s))}
                onUpdate={updateProgram}
            />
            <ReturnButton path='/profesor/'/>
        </HomeLayout>
    );
}

export default UpdateProg