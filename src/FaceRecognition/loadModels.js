import * as faceapi from 'face-api.js'

const MODELS_URL = '/models/face_recognition'


  (async () => {
    await faceapi.loadSsdMobilenetv1Model(MODELS_URL)
    await faceapi.loadFaceLandmarkModel(MODELS_URL)
    await faceapi.loadFaceRecognitionModel(MODELS_URL)
    await faceapi.loadFaceExpressionModel(MODELS_URL)
  })()
