import * as faceapi from 'face-api.js'
import { checkAttendance } from '../services/attendantService'

let recognitionLock = false

export async function startFaceDetection(
  video: HTMLVideoElement,
  canvas: HTMLCanvasElement
) {
  // Ajustamos las medidas del canvas para que coincidan con el video
  canvas.width = video.width
  canvas.height = video.height
  // Obtenemos las medidas del video
  const displaySize = { width: video.videoWidth, height: video.videoHeight }
  // Igualamos canvas y video
  faceapi.matchDimensions(canvas, displaySize)
  // Ejecuta 5 veces por segundo
  setInterval(async () => {
    // Detecta rostros
    const detections = await faceapi.detectAllFaces(
      video,
      new faceapi.TinyFaceDetectorOptions()
    )
    // Obtiene las coordenadas de los rostros en video
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    // Dibuja los cuadros alrededor de la cara
    const ctx = canvas.getContext('2d')
    ctx?.clearRect(0, 0, canvas.width, canvas.height)
    // Dibuja en el canvas
    faceapi.draw.drawDetections(canvas, resizedDetections)

    if (detections.length > 0 && !recognitionLock) {
      recognitionLock = true // Impedimos multiples registros de manera rapida
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height) // Se captura la imagen
      // Se pasa la imagen
      canvas.toBlob(blob => {
        if (blob) sendFaceToServer(blob)
        else console.error('No se pudo generar el blob desde el canvas')
      }, 'image/jpeg')
    }
  }, 200)

}

function sendFaceToServer(blob: Blob) {
  //mandar al servidor
  checkAttendance(blob).then(checkout => {
    //verificar asistencia
    if(checkout){
      //mensaje de marcado
      alert("Asistencia marcada!!");
    }else{
      //mensaje de no marcado
      alert("Asistencia no marcada");
    }
  }).catch(err => console.error(err));

  //retirar el lock
  setTimeout(() => {
    recognitionLock = false
    console.log('Recognition lock liberado')
  }, 10000);
}