import { useEffect, useRef } from 'react'
import { loadFaceDetectionModels } from '../../FaceRecognition/loadModels'
import { startFaceDetection } from '../../FaceRecognition/startDetection'


export default function Camera () {
  const CAMERA_ID = 'FACE_RECOGNITION'
  const CANVAS_ID = 'CANVAS_FACE_RECOGNITION'

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream>(null);
  
  //obtener componente al montar
  useEffect(() => {
    //verificar si se puede usar media devices
    if (!navigator.mediaDevices) {
        console.error('Tu navehador no soporta getUserMedia')
        return;
    }

    //iniciar camara
    (async (video: HTMLVideoElement | null, canvas:HTMLCanvasElement | null) => {
      //validar camara y canvas
      if(!video || !canvas){
        return;
      }

      try {
          await loadFaceDetectionModels()

          streamRef.current = await navigator.mediaDevices.getUserMedia({
            video: true
          })
          video.srcObject = streamRef.current;

          video.onloadedmetadata = () => {
            video.play()

            canvas.width = video.width
            canvas.height = video.height

            startFaceDetection(video, canvas)
          }
      } catch (err) {
        console.error(`Error accediendo a la cámara: ${err}`)
      }
    })(videoRef.current,canvasRef.current);

    //al desmontar se limpia o cierra lo que abra el efecto
    return () => {
      streamRef.current && streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }; 
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
