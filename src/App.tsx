import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomeMenu/HomePages'
import EntityModules from './pages/HomeMenu/EntityModules'
import { Delete } from './pages/CrudActions/Delete'
// import CreateAlu from './pages/AlumnoPages/register'
// import IndexAlu from './pages/AlumnoPages'
// import DeleteAlu from './pages/AlumnoPages/delete'

function App () {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/alumno' element={<EntityModules entity='alumno' />} />
      {/* <Route path='/alumno/get' element={<IndexAlu/>} />
      {/* <Route path='/alumno/create' element={<CreateAlu/>} /> */}
      <Route path='/alumno/delete'element={<Delete headers={['Numero control', 'Nombre', 'Apellidos', 'Correo']} entity='alumno'/>}/>
      <Route path='/profesor' element={<EntityModules entity='profesor' />} />
      <Route path='/curso' element={<EntityModules entity='curso' />} />
    </Routes>
  )
}

export default App
