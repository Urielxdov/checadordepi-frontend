import Camera from '../../componets/FacialRecognition/Camera'
import Clock from '../../componets/utils/general/Clock'
import DateDisplay from '../../componets/utils/general/DateDisplay'
import HomeLayout from '../Layouts/HomeLayout'

export default function FacialRecognition () {
  return (
    <HomeLayout title='Registro de Asistencia'>
      <>
        <DateDisplay />
        <Clock />
      </>
      <Camera />
    </HomeLayout>
  )
}
