import Camera from '../../components/FacialRecognition/Camera'
import useCamera from '../../hooks/custom/useCamera';
import Clock from '../../components/FacialRecognition/Clock'
import DateDisplay from '../../components/FacialRecognition/DateDisplay'
import HomeLayout from '../../components/ui/HomeLayout'
import Modal from '../../components/ui/Modals';

export default function FacialRecognition () {
  const { videoRef, canvasRef, checked, initCamera, closeCamera } = useCamera();

  const overlayConfig = {
    success:   { type: "success", title: "Asistencia registrada",   message: "Entrada registrada con éxito. Puede ingresar al plantel." },
    duplicate: { type: "info",    title: "Ya registrado hoy",        message: "Tu asistencia de hoy ya fue marcada anteriormente." },
    error:     { type: "failure", title: "No reconocido",            message: "No se pudo identificar al alumno. Inténtalo de nuevo." },
  } as const;

  const overlay = checked ? overlayConfig[checked] : null;

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
      {overlay && (
        <Modal
          title={overlay.title}
          message={overlay.message}
          type={overlay.type}
          isOpen={true}
          onClose={() => {}}
        />
      )}
    </>
  );
}
