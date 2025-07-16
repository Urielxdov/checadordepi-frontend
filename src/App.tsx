import './App.css'
import { Route, Routes } from 'react-router-dom'

//pages
import LoginView from './pages/HomeMenu/LoginForm';
import HomePage from './pages/HomeMenu/HomePages'
import EntityModules from './pages/HomeMenu/EntityModules'
import CreateAlu from './pages/AlumnoPages/register'
import IndexAlu from './pages/AlumnoPages'
import UpdateAlu from './pages/AlumnoPages/update'
import DeleteAlu from './pages/AlumnoPages/delete'
import IndexProf from './pages/ProfesorPages';
import CreateProf from './pages/ProfesorPages/register';
import DeleteProf from './pages/ProfesorPages/delete';
import IndexProg from './pages/ProgramaPages';
import CreateProg from './pages/ProgramaPages/register';
import DeleteProg from './pages/ProgramaPages/delete';

//wrappers
import StudentWrapper from './componets/utils/wrappers/StudentWrapper';
import AuthWrapper from './componets/utils/wrappers/AuthWrapper'
import ProtectedRoute from './componets/utils/wrappers/ProtectedRoute';
import TeacherWrapper from './componets/utils/wrappers/TeacherWrapper';
import ProgramWrapper from './componets/utils/wrappers/ProgramWrapper';
import UpdateProf from './pages/ProfesorPages/update';
import UpdateProg from './pages/ProgramaPages/update';

function App () {
  return (
    <Routes>
      <Route element={<AuthWrapper/>}>
        {/** Ruta de login */}
        <Route path='/' element={<LoginView />} />
        {/** Rutas protegidas */}
        <Route element={<ProtectedRoute/>}>
          <Route path='/home' element={<HomePage />} />
        </Route>
        {/** Rutas de alumno */}
        <Route element={<StudentWrapper/>}>
            <Route path='/alumno' element={<EntityModules entity='alumno' />} />
            <Route path='/alumno/get' element={<IndexAlu/>} />
            <Route path='/alumno/create' element={<CreateAlu/>} />
            <Route path='/alumno/delete' element={<DeleteAlu/>} />
            <Route path='/alumno/update' element={<UpdateAlu/>} />
        </Route>
        {/** Rutas de profesor */}
        <Route element={<TeacherWrapper/>}>
            <Route path='/profesor' element={<EntityModules entity='profesor' />} />
            <Route path='/profesor/get' element={<IndexProf/>} />
            <Route path='/profesor/create' element={<CreateProf/>} />
            <Route path='/profesor/delete' element={<DeleteProf/>} />
            <Route path='/profesor/update' element={<UpdateProf/>} />
        </Route>
        {/** Rutas de programa/curso */}
        <Route element={<ProgramWrapper/>}>
            <Route path='/curso' element={<EntityModules entity='curso' />} />
            <Route path='/curso/get' element={<IndexProg />} />
            <Route path='/curso/create' element={<CreateProg />} />
            <Route path='/curso/delete' element={<DeleteProg />} />
            <Route path='/curso/update' element={<UpdateProg />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
