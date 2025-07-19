import { useEffect } from 'react'

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
      } catch (err) {
        console.error('Error accediendo a la cámara:', err)
      }
    }

    startCamera()
  }, [])

  return (
    <>
      <video
        id={CAMERA_ID}
        autoPlay
        muted
        playsInline
        className='w-full max-w-md'
      />
      <canvas id={CANVAS_ID} />
    </>
  )
}
