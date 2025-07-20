import * as faceapi from 'face-api.js'

const MODELS_URL = '/models/face_recognition'

export default async function loadModels(idVideo: string, idCanvas: string): Promise<void> {
  await faceapi.nets.tinyFaceDetector.loadFromUri(MODELS_URL)

  const video = document.getElementById(idVideo) as HTMLVideoElement | null
  const canvas = document.getElementById(idCanvas) as HTMLCanvasElement | null

  if (!video || !canvas) {
    console.error('Video o canvas no encontrados')
    return
  }

  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)

  const detect = async () => {
    const detections = await faceapi.detectAllFaces(
      video,
      new faceapi.TinyFaceDetectorOptions()
    )

    const resized = faceapi.resizeResults(detections, displaySize)

    const ctx = canvas.getContext('2d')
    ctx?.clearRect(0, 0, canvas.width, canvas.height)

    faceapi.draw.drawDetections(canvas, resized)

    requestAnimationFrame(detect)
  }

  detect()
}
