import { useEffect } from 'react'
import Update from '../CrudActions/Update'
import { useTeachers } from '../../hooks/custom/useTeachers'
import HomeLayout from '../Layouts/HomeLayout'
import ReturnButton from '../../componets/utils/buttons/ReturnButton'
import { PROFESORHEADERS } from '../../utils/Headers'

function UpdateProf(){
    //obtener el contexto
    const context = useTeachers();

    //si no hay regresar error
    if(!context){ return <div>No hay contexto!!!</div> }

    //obtener lo necesario
    const { state, searchTeacher, updateTeacher } = context

    //efecto para busqueda
    useEffect(() => {
        if(state.teacher){
            console.log("profesor encontrado")
        }else{
            console.log("profesor no encontrado")
        }
    },[state.teacher])

    //retorno de componente
    return (
        <HomeLayout title="Modulo profesor">
            <Update
                module='profesor'
                headers={PROFESORHEADERS}
                body={state.teachers}
                onSearch={searchTeacher}
                onUpdate={updateTeacher}
            />
            <ReturnButton path='/profesor/'/>
        </HomeLayout>
    );
}

export default UpdateProf