import * as faceapi from 'face-api.js'

const MODELS_URL = '/models/face_recognition'

export async function loadFaceDetectionModels(): Promise<void> {
  await faceapi.nets.tinyFaceDetector.loadFromUri(MODELS_URL)
}
