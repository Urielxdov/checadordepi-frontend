import * as faceapi from 'face-api.js'

export function startFaceDetection(video: HTMLVideoElement, canvas: HTMLCanvasElement) {
  const displaySize = {
    width: video.videoWidth,
    height: video.videoHeight
  }
  faceapi.matchDimensions(canvas, displaySize)

  const ctx = canvas.getContext('2d')
  if (!ctx) {
    console.error('No se pudo obtener el contexto del canvas')
    return
  }

  const detect = async () => {
    const detections = await faceapi.detectAllFaces(
      video,
      new faceapi.TinyFaceDetectorOptions()
    )

    const resized = faceapi.resizeResults(detections, displaySize)

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    resized.forEach(result => {
      const { x, y, width, height } = result.box
      ctx.beginPath()
      ctx.rect(x, y, width, height)
      ctx.lineWidth = 2
      ctx.strokeStyle = 'blue'
      ctx.stroke()
    })

    requestAnimationFrame(detect)
  }

  detect()
}
