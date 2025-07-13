import { ALUMNOHEADERS } from '../../utils/Headers'
import Index from '../CrudActions/Index'
import ReturnButton from '../../componets/utils/buttons/ReturnButton'
import HomeLayout from '../Layouts/HomeLayout'
import { useContext } from 'react'
import { StudentsContext } from '../../hooks/context/StudentContext'

function IndexAlu () {
  //hook de alumnos
  const context = useContext(StudentsContext)

  if (!context) return <div>Error: contexto no disponible</div>

  const { state, searchStudent } = context
  return (
    <HomeLayout title='Lista de alumnos'>
      <Index
        headers={ALUMNOHEADERS}
        data={state.students}
        action={(numberControl: string) => searchStudent(numberControl)}
      />
      <ReturnButton path='/alumno/' />
    </HomeLayout>
  )
}

export default IndexAlu
