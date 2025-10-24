import * as faceapi from 'face-api.js'

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

  const formData = new FormData()
  formData.append('file', blob, 'face.jpg')

  //esta ruta va a cambiar parael backend de java
  fetch('http://localhost:8080/facial-recognition/student-attendance', {
    method: 'POST',
    body: formData,
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return response.json()
    })
    .then(data => {
      console.log('Imagen enviada exitosamente:', data)
    })
    .catch(error => {
      console.error('Error al enviar la imagen:', error)
      console.error('Error details:', error.message)
    })

  setTimeout(() => {
    recognitionLock = false
    console.log('Recognition lock liberado')
  }, 10000)
}