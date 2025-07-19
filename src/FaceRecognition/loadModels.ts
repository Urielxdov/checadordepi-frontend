import * as faceapi from 'face-api.js'

const MODELS_URL = '/models/face_recognition'

export default async function loadModels(idVideo: string, idCanvas: string): Promise<void> {
  await faceapi.nets.ssdMobilenetv1.loadFromUri(MODELS_URL)
  await faceapi.nets.faceLandmark68Net.loadFromUri(MODELS_URL)
  await faceapi.nets.faceRecognitionNet.loadFromUri(MODELS_URL)
  await faceapi.nets.faceExpressionNet.loadFromUri(MODELS_URL)

  const video = document.getElementById(idVideo) as HTMLVideoElement | null
  const canvas = document.getElementById(idCanvas) as HTMLCanvasElement | null

  if (!video || !canvas) {
    console.error('Video o canvas no encontrados')
    return
  }

  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)

  const detect = async () => {
    const detections = await faceapi
      .detectAllFaces(video)
      .withFaceLandmarks()
      .withFaceDescriptors()
      .withFaceExpressions()

    const resized = faceapi.resizeResults(detections, displaySize)

    canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas, resized)
    faceapi.draw.drawFaceLandmarks(canvas, resized)
    faceapi.draw.drawFaceExpressions(canvas, resized, 0.05)

    requestAnimationFrame(detect) // loop
  }

  detect()
}
