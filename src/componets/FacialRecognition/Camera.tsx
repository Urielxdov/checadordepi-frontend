import { useRef } from 'react'
import { useCamera } from '../../hooks/custom/useCamera'

export default function Camera () {
  const CAMERA_ID = 'FACE_RECOGNITION'
  const CANVAS_ID = 'CANVAS_FACE_RECOGNITION'

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  
  useCamera(videoRef, canvasRef)

  return (
    <div className='relative w-full h-full max-w-6/12 mx-auto'>
      <video
        id={CAMERA_ID}
        autoPlay
        muted
        playsInline
        width={640}
        height={480}
        className='w-full'
        ref={videoRef}
      />
      <canvas
        ref={canvasRef}
        id={CANVAS_ID}
        className='absolute top-0 left-0 w-full h-full'
      />
    </div>
  )
}
