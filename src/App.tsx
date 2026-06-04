import './App.css'
import { Route, Routes } from 'react-router-dom'

// pages
import LoginView from './app/HomeMenu/LoginForm'
import Logout from './app/HomeMenu/LogoutView'
import HomePage from './app/HomeMenu/HomePages'
import AlumnoPage from './app/AlumnoPages/AlumnoPage'
import ProfesorPage from './app/ProfesorPages/ProfesorPage'
import ProgramaPage from './app/ProgramaPages/ProgramaPage'
import JustifyAlu from './app/AlumnoPages/justify'
import JustifyOneAlu from './app/AlumnoPages/justifyone'
import FacialRecognition from './app/FacialRecognition/FacialRecognition'
import AttendanceChecked from './app/FacialRecognition/AttendanceChecked'

// wrappers
import AuthWrapper from './components/wrappers/AuthWrapper'
import ProtectedRoute from './components/wrappers/ProtectedRoute'

function App() {
    return (
        <Routes>
            <Route element={<AuthWrapper />}>
                <Route path='/' element={<LoginView />} />
                <Route path='/logout' element={<Logout />} />

                <Route element={<ProtectedRoute />}>
                    <Route path='/home' element={<HomePage />} />
                    <Route path='/alumno' element={<AlumnoPage />} />
                    <Route path='/alumno/justify' element={<JustifyAlu />} />
                    <Route path='/alumno/justify/:id' element={<JustifyOneAlu />} />
                    <Route path='/asesor' element={<ProfesorPage />} />
                    <Route path='/programa' element={<ProgramaPage />} />
                </Route>
            </Route>

            {/* Public kiosk routes — intentionally outside AuthWrapper, no login required */}
            <Route path='/asistencia' element={<FacialRecognition />} />
            <Route path='/asistencia/valida' element={<AttendanceChecked />} />
        </Routes>
    )
}

export default App
