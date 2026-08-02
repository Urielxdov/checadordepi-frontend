import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface ReturnButtonProps {
  path: string
}

export default function ReturnButton ({ path }: ReturnButtonProps) {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate(path)}
      className='flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors w-fit'
    >
      <ArrowLeft className='w-4 h-4' />
      Regresar
    </button>
  )
}
