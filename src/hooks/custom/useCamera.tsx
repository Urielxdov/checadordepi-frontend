import { useRef, useState } from 'react';
import { loadFaceDetectionModels } from '../../FaceRecognition/loadModels';
import * as faceapi from 'face-api.js';
import { checkAttendance } from '../../services/attendantService';

//manejo de camara
export default function useCamera () {
  //referencias a objetos HTML
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream>(null);
  //timmers
  const intervalRef = useRef<NodeJS.Timeout>(null);
  const timmerLockRef = useRef<NodeJS.Timeout>(null);
  //lock de reconocimiento
  const lockRef = useRef<Boolean>(false);
  //mensaje de detecction
  const [checked,setChecked] = useState<Boolean | null>(null);

  //iniciar reconocimiento
  const startDetection = (video: HTMLVideoElement, canvas:HTMLCanvasElement) => {
    // Ajustamos las medidas del canvas para que coincidan con el video
      canvas.width = video.width
      canvas.height = video.height
      // Obtenemos las medidas del video
      const displaySize = { width: video.videoWidth, height: video.videoHeight }
      // Igualamos canvas y video
      faceapi.matchDimensions(canvas, displaySize);
      // Ejecuta 5 veces por segundo
      intervalRef.current = setInterval(async () => {
        // Detecta rostros
        const detections = await faceapi.detectAllFaces(
          video,
          new faceapi.TinyFaceDetectorOptions()
        )
        // Obtiene las coordenadas de los rostros en video
        const resizedDetections = faceapi.resizeResults(detections, displaySize)
        // Dibuja los cuadros alrededor de la cara
        const ctx = canvas.getContext('2d')
        ctx && ctx.clearRect(0, 0, canvas.width, canvas.height)
        // Dibuja en el canvas
        faceapi.draw.drawDetections(canvas, resizedDetections)
    
        if (detections.length > 0 && !lockRef.current) {
          lockRef.current = true; // Impedimos multiples registros de manera rapida
          ctx && ctx.drawImage(video, 0, 0, canvas.width, canvas.height) // Se captura la imagen
          // Se pasa la imagen
          canvas.toBlob(blob => {
            if (blob) {
              //mandar al servidor
              checkAttendance(blob).then( check => {
                //definir la respuesta
                setChecked(check);
              }).catch(err => { console.error(err); setChecked(null); });

              //timeout de lock
              timmerLockRef.current = setTimeout(() => { 
                //liberar el lock
                lockRef.current = false;
              },10000);
            }
            else console.error('No se pudo generar el blob desde el canvas')
          }, 'image/jpeg')
        }
      }, 200)
  }

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

            startDetection(video, canvas);
          }
      } catch (err) {
        console.error(`Error accediendo a la cámara: ${err}`)
      }
    };

  //al desmontar se limpia o cierra lo que abra el efecto
  const closeCamera = () => {
    closeCameraStream();
    cleanTimmers();
  }

  const closeCameraStream = () => {
    //cerrar los streams de camara
    streamRef.current && streamRef.current.getTracks().forEach(track => track.stop());
    streamRef.current = null;
  };

  const cleanTimmers = () => {
    if(intervalRef.current){ clearTimeout(intervalRef.current); }
    if(timmerLockRef.current){  clearTimeout(timmerLockRef.current); }
  }

  //retornar elementos
  return { videoRef, canvasRef, checked, initCamera, closeCamera };
}
