import { useRef } from 'react'
import { loadFaceDetectionModels } from '../../FaceRecognition/loadModels'
import { startFaceDetection } from '../../FaceRecognition/startDetection'

//manejo de camara
export default function useCamera () {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream>(null);

    //iniciar camara
  const initCamera = async (video: HTMLVideoElement | null, canvas:HTMLCanvasElement | null) => {
      //validar camara y canvas
      if(!video || !canvas){
        return;
      }

      try {
          await loadFaceDetectionModels();

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
    };

  //al desmontar se limpia o cierra lo que abra el efecto
  const closeCameraStream = () => {
    streamRef.current && streamRef.current.getTracks().forEach(track => track.stop());
    streamRef.current = null;
  }; 

  //retornar elementos
  return { videoRef, canvasRef, initCamera, closeCameraStream };
}
