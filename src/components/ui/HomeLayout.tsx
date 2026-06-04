import { useState } from 'react'
import { Menu, Home, LogOut, X, Users, UserCheck, BookOpen, ChevronRight } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'

interface Props {
  title: string
  children: React.ReactNode
}

const navItems = [
  { label: 'Inicio', path: '/home', icon: <Home className='w-4 h-4' /> },
  { label: 'Alumno', path: '/alumno', icon: <Users className='w-4 h-4' /> },
  { label: 'Asesor', path: '/asesor', icon: <UserCheck className='w-4 h-4' /> },
  { label: 'Programa', path: '/programa', icon: <BookOpen className='w-4 h-4' /> },
]

export default function HomeLayout ({ title, children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className='min-h-screen flex flex-col bg-gray-50'>
      {sidebarOpen && (
        <div
          className='fixed inset-0 bg-black/40 z-30'
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform duration-200 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className='flex items-center justify-between px-4 py-4 border-b border-gray-100'>
          <span className='font-semibold text-gray-700 text-sm'>Navegación</span>
          <button
            onClick={() => setSidebarOpen(false)}
            className='text-gray-400 hover:text-gray-600 cursor-pointer'
          >
            <X className='w-5 h-5' />
          </button>
        </div>
        <nav className='p-3 flex flex-col gap-1'>
          {navItems.map(item => (
            <button
              key={item.path}
              onClick={() => { navigate(item.path); setSidebarOpen(false) }}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer w-full text-left ${
                location.pathname === item.path
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
        <div className='absolute bottom-0 left-0 right-0 p-3 border-t border-gray-100'>
          <button
            onClick={() => navigate('/logout')}
            className='flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm font-medium text-red-500 hover:bg-red-50 transition-colors cursor-pointer'
          >
            <LogOut className='w-4 h-4' />
            Cerrar sesión
          </button>
        </div>
      </aside>

      <header className='sticky top-0 z-20 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 shadow-sm'>
        <button
          onClick={() => setSidebarOpen(true)}
          className='p-1.5 rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700 cursor-pointer transition-colors'
        >
          <Menu className='w-5 h-5' />
        </button>
        <button
          onClick={() => navigate('/home')}
          className='flex items-center gap-1.5 text-gray-500 hover:text-gray-700 cursor-pointer transition-colors text-sm'
        >
          <Home className='w-4 h-4' />
          <span>Inicio</span>
        </button>
        <ChevronRight className='w-4 h-4 text-gray-300' />
        <span className='text-sm font-medium text-gray-700 capitalize'>{title}</span>
        <div className='ml-auto'>
          <button
            onClick={() => navigate('/logout')}
            className='flex items-center gap-2 px-3 py-1.5 rounded-md text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700 cursor-pointer transition-colors'
          >
            <LogOut className='w-4 h-4' />
            Cerrar sesión
          </button>
        </div>
      </header>

      <main className='flex-1 w-full max-w-6xl mx-auto px-4 py-6'>
        <div className='bg-white rounded-lg shadow-custom-soft overflow-hidden'>
          <div className='border-b border-gray-100 bg-gray-50 px-5 py-3'>
            <h1 className='text-sm font-medium text-gray-600 capitalize'>{title}</h1>
          </div>
          <div className='p-5 flex flex-col gap-4'>{children}</div>
        </div>
      </main>

      <footer className='border-t border-gray-200 bg-white'>
        <div className='flex justify-between items-center px-6 py-3 text-xs text-gray-400'>
          <p>© 2025 Todos los derechos reservados.</p>
          <p>v1.0</p>
        </div>
      </footer>
    </div>
  )
}
