import { useEffect } from 'react'
import Update from '../CrudActions/Update'
import { useStudents } from '../../hooks/custom/useStudents'
import HomeLayout from '../Layouts/HomeLayout'
import ReturnButton from '../../componets/utils/buttons/ReturnButton'
import { ALUMNOHEADERS } from '../../utils/Headers'

function UpdateAlu () {
  //contexto de alumno
  const context = useStudents()

  if (!context) return <div>Error: No se encontro el contexto</div>

  const { state, updateStudent, searchStudent } = context

  useEffect(() => {
    if (!state.student) {
      console.log('No se encontro ningun alumno para actualizar')
    } else {
      console.log('Alumno encontrado')
    }
  }, [state.student])

  return (
    <HomeLayout title='Modulo Alumno'>
      <Update
        module='alumno'
        body={state.students}
        headers={ALUMNOHEADERS}
        onSearch={searchStudent}
        onUpdate={updateStudent}
      />
      <ReturnButton path='/alumno/' />
    </HomeLayout>
  )
}

export default UpdateAlu
