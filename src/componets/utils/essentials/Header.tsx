import { Menu, Home, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Header () {
  const navigate = useNavigate()
  return (
    <>
      <header className='fixed top-0 left-0 z-50 w-full bg-white shadow px-8 py-4 flex justify-between items-center'>
        <div className='flex'>
          <button className='text-gray-500'>
            <Menu className='w-5 h-5 hover:text-gray-700 hover:cursor-pointer rounded-2xl' />
          </button>
          <button
            onClick={() => navigate('/home')}
            className='flex items-center ml-2 text-gray-500 hover:text-gray-700 hover:cursor-pointer'
          >
            <Home className='w-5 h-5' />
            Inicio
          </button>
        </div>

        <div>
          <button onClick={() => navigate('/logout')}
          className='flex items-center ml-2 text-gray-500 hover:text-gray-700 hover:cursor-pointer'
          >
            <LogOut className='w-5 h-5'/>
            cerrar sesion
          </button>
        </div>
      </header>
      <div className='relative flex justify-between top-0 left-0 w-full p-4'></div>
    </>
  )
}
