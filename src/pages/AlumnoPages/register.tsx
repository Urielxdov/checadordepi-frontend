import { useContext } from 'react'
import ReturnButton from '../../componets/utils/buttons/ReturnButton'
import Create from '../CrudActions/Create'
import HomeLayout from '../Layouts/HomeLayout'
import { StudentsContext } from '../../hooks/context/StudentContext'

function CreateAlu () {
  //funcion de manejo

  const context = useContext(StudentsContext)

  if (!context) return <div>Error: No se enconto el contexto</div>

  const { addStudent } = context

  //configuracion de campos
  const fields = [
    {
      label: 'Numero de control',
      name: 'noControl',
      type: 'text',
      maxlength: 8,
      minlength: 8,
      value: ''
    },
    {
      label: 'Nombre(s)',
      name: 'nombre',
      type: 'text',
      value: ''
    },
    {
      label: 'Apellidos',
      name: 'apellidos',
      type: 'text',
      value: ''
    },
    {
      label: 'Telefono',
      name: 'telefono',
      type: 'tel',
      maxlength: 10,
      value: ''
    },
    {
      label: 'Calle y numero',
      name: 'calle',
      type: 'text',
      value: ''
    },
    {
      label: 'Colonia',
      name: 'colonia',
      type: 'text',
      value: ''
    },
    {
      label: 'Correo',
      name: 'correo',
      type: 'email',
      value: ''
    }
  ]

  //retorno de vista
  return (
    <HomeLayout title='Modulo Alumno'>
      <Create module='Alumno' fields={fields} onSubmit={addStudent} />
      <ReturnButton path='/alumno/' />
    </HomeLayout>
  )
}

export default CreateAlu
