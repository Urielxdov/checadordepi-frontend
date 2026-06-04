import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface PropsAccessButton {
  url: string
}

export default function AccessButton ({ url }: PropsAccessButton) {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate(url)}
      className='flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 cursor-pointer transition-colors'
    >
      Ingresar
      <ArrowRight className='w-4 h-4' />
    </button>
  )
}
