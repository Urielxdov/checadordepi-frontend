import './App.css'
import { Route, Routes } from 'react-router-dom'

//pages
import LoginView from './pages/HomeMenu/LoginForm';
import HomePage from './pages/HomeMenu/HomePages'
import EntityModules from './pages/HomeMenu/EntityModules'
import CreateAlu from './pages/AlumnoPages/register'
import IndexAlu from './pages/AlumnoPages'
import UpdateAlu from './pages/AlumnoPages/update'
// import DeleteAlu from './pages/AlumnoPages/delete'

//wrappers
import StudentWrapper from './componets/utils/wrappers/StudentWrapper';
import AuthWrapper from './componets/utils/wrappers/AuthWrapper'
import ProtectedRoute from './componets/utils/wrappers/ProtectedRoute';

function App () {
  return (
    <Routes>
      <Route element={<AuthWrapper/>}>
        {/** Ruta de login */}
        <Route path='/' element={<LoginView />} />
        {/** Rutas protegidas */}
        <Route element={<ProtectedRoute/>}>
          <Route path='/home' element={<HomePage />} />
          <Route path='/profesor' element={<EntityModules entity='profesor' />} />
          <Route path='/curso' element={<EntityModules entity='curso' />} />
        </Route>
        {/** Rutas de alumno */}
        <Route element={<StudentWrapper/>}>
            <Route path='/alumno' element={<EntityModules entity='alumno' />} />
            <Route path='/alumno/get' element={<IndexAlu/>} />
            <Route path='/alumno/create' element={<CreateAlu/>} />
            <Route path='/alumno/update' element={<UpdateAlu/>} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
