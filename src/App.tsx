import './App.css'
import { Route, Routes } from 'react-router-dom'

// pages
import LoginView from './app/HomeMenu/LoginForm'
import Logout from './app/HomeMenu/LogoutView'
import HomePage from './app/HomeMenu/HomePages'
import EntityModules from './app/HomeMenu/EntityModules'
import CreateAlu from './app/AlumnoPages/register'
import IndexAlu from './app/AlumnoPages'
import UpdateAlu from './app/AlumnoPages/update'
import DeleteAlu from './app/AlumnoPages/delete'
import IndexProf from './app/ProfesorPages'
import CreateProf from './app/ProfesorPages/register'
import DeleteProf from './app/ProfesorPages/delete'
import UpdateProf from './app/ProfesorPages/update'
import IndexProg from './app/ProgramaPages'
import CreateProg from './app/ProgramaPages/register'
import DeleteProg from './app/ProgramaPages/delete'
import FacialRecognition from './app/FacialRecognition/FacialRecognition'
import AttendanceChecked from './app/FacialRecognition/AttendanceChecked'
import JustifyAlu from './app/AlumnoPages/justify'
import JustifyOneAlu from './app/AlumnoPages/justifyone'
import UpdateProg from './app/ProgramaPages/update'

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

                    {/* Alumno */}
                    <Route path='/alumno' element={<EntityModules entity='alumno' />} />
                    <Route path='/alumno/get' element={<IndexAlu />} />
                    <Route path='/alumno/create' element={<CreateAlu />} />
                    <Route path='/alumno/delete' element={<DeleteAlu />} />
                    <Route path='/alumno/update' element={<UpdateAlu />} />
                    <Route path='/alumno/justify' element={<JustifyAlu />} />
                    <Route path='/alumno/justify/:id' element={<JustifyOneAlu />} />

                    {/* Asesor */}
                    <Route path='/asesor' element={<EntityModules entity='asesor' />} />
                    <Route path='/asesor/get' element={<IndexProf />} />
                    <Route path='/asesor/create' element={<CreateProf />} />
                    <Route path='/asesor/delete' element={<DeleteProf />} />
                    <Route path='/asesor/update' element={<UpdateProf />} />

                    {/* Programa */}
                    <Route path='/programa' element={<EntityModules entity='programa' />} />
                    <Route path='/programa/get' element={<IndexProg />} />
                    <Route path='/programa/create' element={<CreateProg />} />
                    <Route path='/programa/delete' element={<DeleteProg />} />
                    <Route path='/programa/update' element={<UpdateProg />} />
                </Route>

                {/* Public kiosk routes — intentionally outside ProtectedRoute, no login required */}
                <Route path='/asistencia' element={<FacialRecognition />} />
                <Route path='/asistencia/valida' element={<AttendanceChecked />} />
            </Route>
        </Routes>
    )
}

export default App
