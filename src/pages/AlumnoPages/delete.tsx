import Delete from '../CrudActions/Delete'
import HomeLayout from '../Layouts/HomeLayout'
import ReturnButton from '../../componets/utils/buttons/ReturnButton'
import { ALUMNOHEADERS } from '../../utils/Headers'
import { useContext } from 'react'
import { StudentsContext } from '../../hooks/context/StudentContext'

function DeleteAlu () {
  //contexto de alumno
  const context = useContext(StudentsContext)

  if (!context) return <div>Error: contexto no disponible</div>

  const { state, deleteStudent, searchStudent } = context

  //retorno de componente
  return (
    <HomeLayout title='Modulo Alumno'>
      <Delete
        headers={ALUMNOHEADERS}
        entity='alumno'
        body={state.students}
        onSearch={(numberControl: string) => searchStudent(numberControl)}
        onDelete={(numberControl: string) => deleteStudent(numberControl)}
      />
      <ReturnButton path='/alumno/' />
    </HomeLayout>
  )
}

export default DeleteAlu
