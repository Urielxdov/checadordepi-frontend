import { useRef, useState } from 'react';
import { loadFaceDetectionModels } from '../../utils/loadModels';
import * as faceapi from '@vladmandic/face-api';
import { checkAttendance, type AttendanceResult } from '../../services/attendantService';

export default function useCamera () {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream>(null);
  const intervalRef = useRef<NodeJS.Timeout>(null);
  const resetRef = useRef<NodeJS.Timeout>(null);
  const lockRef = useRef<Boolean>(false);
  const [checked, setChecked] = useState<AttendanceResult | null>(null);

  const startDetection = (video: HTMLVideoElement, canvas: HTMLCanvasElement) => {
    canvas.width = video.width;
    canvas.height = video.height;
    const displaySize = { width: video.videoWidth, height: video.videoHeight };
    faceapi.matchDimensions(canvas, displaySize);

    intervalRef.current = setInterval(async () => {
      const detections = await faceapi.detectAllFaces(
        video,
        new faceapi.TinyFaceDetectorOptions()
      );
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      const ctx = canvas.getContext('2d');
      ctx && ctx.clearRect(0, 0, canvas.width, canvas.height);
      faceapi.draw.drawDetections(canvas, resizedDetections);

      if (detections.length > 0 && !lockRef.current) {
        lockRef.current = true;
        ctx && ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(blob => {
          if (!blob) {
            lockRef.current = false;
            return;
          }
          checkAttendance(blob).then(result => {
            setChecked(result);
            // auto-reset after 4s → unlock and restart detection
            resetRef.current = setTimeout(() => {
              setChecked(null);
              lockRef.current = false;
            }, 4000);
          }).catch(() => {
            lockRef.current = false;
          });
        }, 'image/jpeg');
      }
    }, 200);
  };

  const initCamera = async (video: HTMLVideoElement | null, canvas: HTMLCanvasElement | null) => {
    if (!video || !canvas) return;
    try {
      await loadFaceDetectionModels();
      streamRef.current = await navigator.mediaDevices.getUserMedia({ video: true });
      video.srcObject = streamRef.current;
      video.onloadedmetadata = () => {
        video.play();
        canvas.width = video.width;
        canvas.height = video.height;
        startDetection(video, canvas);
      };
    } catch (err) {
      console.error(`Error accediendo a la cámara: ${err}`);
    }
  };

  const closeCamera = () => {
    streamRef.current?.getTracks().forEach(track => track.stop());
    streamRef.current = null;
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (resetRef.current) clearTimeout(resetRef.current);
  };

  return { videoRef, canvasRef, checked, initCamera, closeCamera };
}
