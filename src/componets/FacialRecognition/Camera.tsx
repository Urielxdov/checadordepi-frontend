import { useEffect } from 'react'
import loadModels from '../../FaceRecognition/loadModels'

export default function Camera () {
  const CAMERA_ID = 'FACE_RECOGNITION'
  const CANVAS_ID = 'CANVAS_FACE_RECOGNITION'

  useEffect(() => {
    const startCamera = async () => {
      const video = document.getElementById(
        CAMERA_ID
      ) as HTMLVideoElement | null
      if (!video) return

      if (
        !navigator.mediaDevices ||
        typeof navigator.mediaDevices.getUserMedia !== 'function'
      ) {
        console.error('Tu navegador no soporta getUserMedia')
        return
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true
        })
        video.srcObject = stream

        // Esperamos a que el video tenga dimensiones válidas
        video.onloadedmetadata = () => {
          video.play()
          loadModels(CAMERA_ID, CANVAS_ID)
        }
      } catch (err) {
        console.error('Error accediendo a la cámara:', err)
      }
    }

    startCamera()
  }, [])

  return (
    <div className='relative w-full max-w-md mx-auto'>
      <video
        id={CAMERA_ID}
        autoPlay
        muted
        playsInline
        width={640}
        height={480}
        className='w-full'
      />
      <canvas id={CANVAS_ID} className='absolute top-0 left-0 w-full h-full' />
    </div>
  )
}
