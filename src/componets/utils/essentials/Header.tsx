import { Menu, Home, ChevronDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

export default function Header () {
  const navigate = useNavigate();
  return (
    <>
      <header className='fixed flex justify-between shadow top-0 left-0 w-full p-4 px-8 bg-white'>
        <div className='flex'>
          <button className='text-gray-500'>
            <Menu className='w-5 h-5 hover:text-gray-700 hover:cursor-pointer rounded-2xl' />
          </button>
          <button onClick={()=>navigate("/")} className='flex items-center ml-2 text-gray-500 hover:text-gray-700 hover:cursor-pointer'>
            <Home className='w-5 h-5' />
            Inicio
          </button>
        </div>

        <div>
          <p className='flex items-center text-gray-500 hover:text-gray-700 hover:cursor-pointer'>
            Usuario <ChevronDown className='w-5 h-5' />
          </p>
        </div>
      </header>
      <div className='relative flex justify-between top-0 left-0 w-full p-4'></div>
    </>
  )
}
