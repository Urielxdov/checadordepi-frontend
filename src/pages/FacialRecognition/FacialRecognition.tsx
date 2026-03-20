import Camera from '../../components/FacialRecognition/Camera'
import useCamera from '../../hooks/custom/useCamera';
import Clock from '../../components/utils/general/Clock'
import DateDisplay from '../../components/utils/general/DateDisplay'
import HomeLayout from '../Layouts/HomeLayout'
import Modal from '../../components/ui/Modals';
import { useEffect, useState } from 'react';

export default function FacialRecognition () {
  //hook de camara
  const { videoRef, canvasRef, checked, initCamera, closeCamera } = useCamera();

  //modales
  const [openSuccessCheck, setOpenSuccessCheck] = useState<boolean>(false);
  const [openFailureCheck, setOpenFailureCheck] = useState<boolean>(false);

  //verificar cual ventana se abre
  useEffect(() => {
    //si no existe
    if(checked == null) { return; }

    //en funcion de la respuesta
    if(checked){
      setOpenSuccessCheck(true);
    }else{
      setOpenFailureCheck(true);
    }
  },[checked]);

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
      <Modal 
        title='Asistencia marcada'
        message='La asistencia ha sido marcada'
        type="success"
        isOpen={openSuccessCheck}
        onClose={ () => setOpenSuccessCheck(false) }
      />
      <Modal 
        title='Asistencia no marcada'
        message='La asistencia no se ha podido marcar'
        type="failure"
        isOpen={openFailureCheck}
        onClose={ () => setOpenFailureCheck(false) }
      />
    </>
  )
}
