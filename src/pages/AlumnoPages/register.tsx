import { useContext } from 'react'
import ReturnButton from '../../componets/utils/buttons/ReturnButton'
import Create from '../CrudActions/Create'
import HomeLayout from '../Layouts/HomeLayout'
import { StudentsContext } from '../../hooks/context/StudentContext'
import { ALUMNOFIELDS } from '../../utils/Fields'

function CreateAlu () {
  //funcion de manejo

  const context = useContext(StudentsContext)

  if (!context) return <div>Error: No se enconto el contexto</div>

  const { addStudent } = context

  //retorno de vista
  return (
    <HomeLayout title='Modulo Alumno'>
      <Create module='Alumno' fields={ALUMNOFIELDS.slice(0, ALUMNOFIELDS.length -1)} onSubmit={addStudent} />
      <ReturnButton path='/alumno/' />
    </HomeLayout>
  )
}

export default CreateAlu
