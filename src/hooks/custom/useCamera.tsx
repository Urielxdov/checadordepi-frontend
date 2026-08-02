import { useRef, useState } from 'react';
import { loadFaceDetectionModels } from '../../utils/loadModels';
import * as faceapi from '@vladmandic/face-api';
import { checkAttendance, type AttendanceResult } from '../../services/attendantService';

const ATTENDANCE_MESSAGE_MS = 5000;
const SUCCESS_CAMERA_BLOCK_MS = 10000;

export default function useCamera () {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream>(null);
  const intervalRef = useRef<NodeJS.Timeout>(null);
  const resetRef = useRef<NodeJS.Timeout>(null);
  const unlockRef = useRef<NodeJS.Timeout>(null);
  const lockRef = useRef<Boolean>(false);
  const lockedUntilRef = useRef<number>(0);
  const [checked, setChecked] = useState<AttendanceResult | null>(null);

  const resetCheck = () => {
    if (resetRef.current) clearTimeout(resetRef.current);
    setChecked(null);
    if (Date.now() < lockedUntilRef.current) return;
    lockRef.current = false;
  };

  const scheduleReset = (result: AttendanceResult) => {
    if (resetRef.current) clearTimeout(resetRef.current);

    if (result.status === 'success') {
      lockedUntilRef.current = Date.now() + SUCCESS_CAMERA_BLOCK_MS;
      resetRef.current = setTimeout(() => {
        setChecked(null);
      }, ATTENDANCE_MESSAGE_MS);

      if (unlockRef.current) clearTimeout(unlockRef.current);
      unlockRef.current = setTimeout(() => {
        lockedUntilRef.current = 0;
        lockRef.current = false;
      }, SUCCESS_CAMERA_BLOCK_MS);
      return;
    }

    if (result.status === 'duplicate') {
      resetRef.current = setTimeout(() => {
        setChecked(null);
        lockRef.current = false;
      }, ATTENDANCE_MESSAGE_MS);
    }
  };

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
            scheduleReset(result);
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
    if (unlockRef.current) clearTimeout(unlockRef.current);
  };

  return { videoRef, canvasRef, checked, resetCheck, initCamera, closeCamera };
}
