import './App.css'
import { Route, Routes } from 'react-router-dom'

//pages
import LoginView from './pages/HomeMenu/LoginForm'
import Logout from './pages/HomeMenu/LogoutView'
import HomePage from './pages/HomeMenu/HomePages'
import EntityModules from './pages/HomeMenu/EntityModules'
import CreateAlu from './pages/AlumnoPages/register'
import IndexAlu from './pages/AlumnoPages'
import UpdateAlu from './pages/AlumnoPages/update'
import DeleteAlu from './pages/AlumnoPages/delete'
import IndexProf from './pages/ProfesorPages'
import CreateProf from './pages/ProfesorPages/register'
import DeleteProf from './pages/ProfesorPages/delete'
import UpdateProf from './pages/ProfesorPages/update'
import IndexProg from './pages/ProgramaPages'
import CreateProg from './pages/ProgramaPages/register'
import DeleteProg from './pages/ProgramaPages/delete'
import FacialRecognition from './pages/FacialRecognition/FacialRecognition'
import AttendanceChecked from './pages/FacialRecognition/AttendanceChecked'

//wrappers
import AuthWrapper from './components/wrappers/AuthWrapper'
import StudentWrapper from './components/wrappers/StudentWrapper'
import UpdateProg from './pages/ProgramaPages/update';
import ProtectedRoute from './components/wrappers/ProtectedRoute'
import TeacherWrapper from './components/wrappers/TeacherWrapper'
import ProgramWrapper from './components/wrappers/ProgramWrapper'

function App () {
  return (
    <Routes>
      <Route element={<AuthWrapper/>}>
        {/** Ruta de login */}
        <Route path='/' element={<LoginView />} />
        <Route path='/logout' element={<Logout />} />
        {/** Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path='/home' element={<HomePage />} />
        </Route>
        {/** Rutas de alumno */}
        <Route element={<StudentWrapper />}>
          <Route path='/alumno' element={<EntityModules entity='alumno' />} />
          <Route path='/alumno/get' element={<IndexAlu />} />
          <Route path='/alumno/create' element={<CreateAlu />} />
          <Route path='/alumno/delete' element={<DeleteAlu />} />
          <Route path='/alumno/update' element={<UpdateAlu />} />
          <Route path='/alumno/justify' element={<UpdateAlu />} />
        </Route>
        {/** Rutas de profesor */}
        <Route element={<TeacherWrapper/>}>
            <Route path='/asesor' element={<EntityModules entity='asesor' />} />
            <Route path='/asesor/get' element={<IndexProf />} />
            <Route path='/asesor/create' element={<CreateProf />} />
            <Route path='/asesor/delete' element={<DeleteProf />} />
            <Route path='/asesor/update' element={<UpdateProf />} />
        </Route>
        {/** Rutas de programa/curso */}
        <Route element={<ProgramWrapper/>}>
            <Route path='/programa' element={<EntityModules entity='programa' />} />
            <Route path='/programa/get' element={<IndexProg />} />
            <Route path='/programa/create' element={<CreateProg />} />
            <Route path='/programa/delete' element={<DeleteProg />} />
            <Route path='/programa/update' element={<UpdateProg />} />
        </Route>
      </Route>
      <Route path='/asistencia' element={<FacialRecognition />} />
      <Route path='/asistencia/valida' element={<AttendanceChecked />} />
    </Routes>
  )
}

export default App
