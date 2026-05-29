import * as faceapi from '@vladmandic/face-api'

const MODELS_URL = '/models/face_recognition'

export async function loadFaceDetectionModels(): Promise<void> {
  await faceapi.nets.tinyFaceDetector.loadFromUri(MODELS_URL)
}
