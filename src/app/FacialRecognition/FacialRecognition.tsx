import Camera from '../../components/FacialRecognition/Camera'
import useCamera from '../../hooks/custom/useCamera'
import Clock from '../../components/FacialRecognition/Clock'
import DateDisplay from '../../components/FacialRecognition/DateDisplay'
import HomeLayout from '../../components/ui/HomeLayout'
import Modal from '../../components/ui/Modals'

export default function FacialRecognition () {
  const { videoRef, canvasRef, checked, resetCheck, initCamera, closeCamera } = useCamera()

  const overlayConfig = {
    success: { type: 'success', title: 'Asistencia registrada' },
    duplicate: { type: 'info', title: 'Ya registrado hoy' },
    not_found: { type: 'failure', title: 'No reconocido' },
    error: { type: 'failure', title: 'Error de asistencia' },
  } as const

  const overlay = checked ? overlayConfig[checked.status] : null

  return (
    <>
      <HomeLayout title='Registro de Asistencia'>
        <>
          <DateDisplay />
          <Clock />
        </>
        <Camera
          videoRef={videoRef}
          canvasRef={canvasRef}
          initCamera={initCamera}
          closeCamera={closeCamera}
        />
      </HomeLayout>
      {checked && overlay && (
        <Modal
          title={overlay.title}
          message={checked.message}
          type={overlay.type}
          isOpen={true}
          onClose={resetCheck}
        />
      )}
    </>
  )
}
