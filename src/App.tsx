import React from 'react'
import './App.css'
import Table from './componets/tables/Table'

const alumnos = [
  { id: '001', nombre: 'Carlos Pérez', carrera: 'Ingeniería' },
  { id: '002', nombre: 'Ana Gómez', carrera: 'Medicina' },
  { id: '003', nombre: 'Luis Torres', carrera: 'Derecho' }
]

const header = ['ID', 'Nombre', 'Carrera']
const body = alumnos.map(alumno => [alumno.id, alumno.nombre, alumno.carrera])

function App () {
  return (
    <div className='p-4'>
      <h1 className='text-xl font-bold mb-4'>Lista de alumnos</h1>
      <Table header={header} body={body} />
    </div>
  )
}

export default App
