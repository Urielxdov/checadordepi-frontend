import Camera from '../../components/FacialRecognition/Camera'
import useCamera from '../../hooks/custom/useCamera';
import Clock from '../../components/utils/general/Clock'
import DateDisplay from '../../components/utils/general/DateDisplay'
import HomeLayout from '../Layouts/HomeLayout'
import Modal from '../../components/ui/Modals';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function FacialRecognition () {
  //hook de camara
  const { videoRef, canvasRef, checked, initCamera, closeCamera } = useCamera();

  //estados
  const [redirect,setRedirect] = useState<boolean>(false);

  //modales
  const [openFailureCheck, setOpenFailureCheck] = useState<boolean>(false);

  //verificar cual ventana se abre
  useEffect(() => {
    //si no existe
    if(checked == null) { return; }

    //en funcion de la respuesta
    if(checked){
      setRedirect(true);
    }else{
      setOpenFailureCheck(true);
    }
  },[checked]);

  //redireccion
  if(redirect){
    return (
      <Navigate to={"/asistencia/valida"}/>
    );
  }

  //vista
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
        title='Asistencia no marcada'
        message='La asistencia no se ha podido marcar'
        type="failure"
        isOpen={openFailureCheck}
        onClose={ () => setOpenFailureCheck(false) }
      />
    </>
  )
}
