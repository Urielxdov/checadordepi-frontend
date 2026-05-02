import { Menu, Home, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from '../interactives/buttons/Button'

interface Props {
  title: string
  children: React.ReactNode
}

export default function HomeLayout ({ title, children }: Props) {
  const navigate = useNavigate()
  return (
    <>
      <header className='relative w-full bg-white shadow px-8 py-4 flex justify-between items-center'>
        <div className='flex'>
          <Button 
            text='' 
            action={() => {}} 
            icon={<Menu className='w-5 h-5 hover:text-gray-700 hover:cursor-pointer rounded-2xl' />}
            styles='text-gray-500'
          />
          <Button
            text='Inicio'
            action={() => navigate('/home')}
            icon={<Home className='w-5 h-5' />}
            styles='ml-2 text-gray-500 hover:text-gray-700 hover:cursor-pointer'
          />
        </div>
        <div>
          <Button
            text='cerrar sesion'
            icon={<LogOut className='w-5 h-5'/>} 
            action={() => navigate('/logout')}
            styles='ml-2 text-gray-500 hover:text-gray-700 hover:cursor-pointer'
          />
        </div>
      </header>
      <main className='relative flex flex-col flex-grow-1 w-260 mx-auto shadow-custom-soft rounded-sm'>
        <div className='border-b border-gray-200 rounded-t-sm bg-gray-100 z-20 text-left py-2 px-4'>
          <p>{title}</p>
        </div>
        <div className='p-4 flex flex-col gap-3'>{children}</div>
      </main>
      <footer className='relative w-full bg-white border-t border-gray-200'>
        <div className='flex justify-between items-center px-4 py-2 text-sm'>
          <p>
            © 2025. Todos los derechos reservados.{' '}
            <a href='#' className='text-blue-600 underline hover:text-blue-800'>
              Aviso de privacidad
            </a>
          </p>
          <p>Versión 1.0</p>
        </div>
      </footer>
    </>
  )
}
