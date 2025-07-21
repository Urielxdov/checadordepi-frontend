import * as faceapi from 'face-api.js'

const MODELS_URL = '/models/face_recognition'

export default async function loadModels(idVideo: string, idCanvas: string): Promise<void> {
  await faceapi.nets.tinyFaceDetector.loadFromUri(MODELS_URL)
  // Video y canvas encima del video
  const video = document.getElementById(idVideo) as HTMLVideoElement | null
  const canvas = document.getElementById(idCanvas) as HTMLCanvasElement | null
  // Validacion de existencia con el id dado
  if (!video || !canvas) {
    console.error('Video o canvas no encontrados')
    return
  }
  // medidas del video
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  // 
  const detect = async () => {
    const detections = await faceapi.detectAllFaces(
      video,
      new faceapi.TinyFaceDetectorOptions()
    )

    const resized = faceapi.resizeResults(detections, displaySize)

    const ctx = canvas.getContext('2d')
    ctx?.clearRect(0, 0, canvas.width, canvas.height)

    resized.forEach(result => {
      const { x, y, width, height } = result.box
      ctx?.beginPath()
      ctx?.rect(x, y, width, height)
      ctx!.lineWidth = 2
      ctx!.strokeStyle = 'red'
      ctx?.stroke()
    })

    requestAnimationFrame(detect)
  }

  detect()
}
