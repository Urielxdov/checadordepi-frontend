import { useEffect, type RefObject } from "react"

//props de camara
interface CameraProps {
  videoRef: RefObject<HTMLVideoElement | null>,
  canvasRef: RefObject<HTMLCanvasElement | null>,
  initCamera: (video: HTMLVideoElement | null, canvas: HTMLCanvasElement | null) => Promise<void>,
  closeCamera: () => void
}

//componente camara
export default function Camera ({ videoRef, canvasRef, initCamera, closeCamera }:CameraProps) {
  const CAMERA_ID = 'FACE_RECOGNITION'
  const CANVAS_ID = 'CANVAS_FACE_RECOGNITION'

  //efecto al montar
  useEffect(() => {
    //verificar si se puede usar media devices
    if (!navigator.mediaDevices) {
        console.error('Tu navehador no soporta getUserMedia')
        return;
    }

    //activar la camara
    initCamera(videoRef.current, canvasRef.current);

    //cerrar el stream
    return closeCamera;
  },[]);

  //componente de camara
  return (
    <div className='relative w-full h-full max-w-6/12 mx-auto'>
      <video
        id={CAMERA_ID}
        autoPlay
        muted
        playsInline
        width={640}
        height={480}
        className='w-full'
        ref={videoRef}
      />
      <canvas
        ref={canvasRef}
        id={CANVAS_ID}
        className='absolute top-0 left-0 w-full h-full'
      />
    </div>
  )
}
