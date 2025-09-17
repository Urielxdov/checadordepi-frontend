import React, { useEffect } from 'react'
import { loadFaceDetectionModels } from '../../FaceRecognition/loadModels'
import { startFaceDetection } from '../../FaceRecognition/startDetection'

export function useCamera (
  videoRef: React.RefObject<HTMLVideoElement>,
  canvasRef: React.RefObject<HTMLCanvasElement>
) {
  useEffect(() => {
    const startCamera = async () => {
      const video = videoRef.current
      const canvas = canvasRef.current

      if (!video || !canvas) {
        console.error('Video o canvas no encontrados')
        return
      }

      if (!navigator.mediaDevices?.getUserMedia) {
        console.error('Tu navehador no soporta getUserMedia')
        return
      }

      try {
        await loadFaceDetectionModels()

        const stream = await navigator.mediaDevices.getUserMedia({
          video: true
        })
        video.srcObject = stream

        video.onloadedmetadata = () => {
          video.play()

          canvas.width = video.width
          canvas.height = video.height

          startFaceDetection(video, canvas)
        }
      } catch (err) {
        console.error(`Error accediendo a la cámara: ${err}`)
      }
    }

    startCamera()
  }, [videoRef, canvasRef])
}
