import Camera from '../../componets/FacialRecognition/Camera'
import useCamera from '../../hooks/custom/useCamera';
import Clock from '../../componets/utils/general/Clock'
import DateDisplay from '../../componets/utils/general/DateDisplay'
import HomeLayout from '../Layouts/HomeLayout'

export default function FacialRecognition () {

  const { videoRef, canvasRef, initCamera, closeCameraStream } = useCamera();

  return (
    <HomeLayout title='Registro de Asistencia'>
      <>
        <DateDisplay />
        <Clock />
      </>
      <Camera 
        videoRef={videoRef}
        canvasRef={canvasRef}
        initCamera={initCamera}
        closeCamera={closeCameraStream}
      />
    </HomeLayout>
  )
}
