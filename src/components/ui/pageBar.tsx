import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PageBarProps {
  current: number
  total: number
  onChange: (page: number) => Promise<void> | void
}

function PageBar ({ current, total, onChange }: PageBarProps) {
  return (
    <div className='flex items-center justify-between mt-2'>
      <button
        onClick={() => onChange(current - 1)}
        disabled={current <= 0}
        className='flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors'
      >
        <ChevronLeft className='w-4 h-4' />
        Anterior
      </button>
      <span className='text-sm text-gray-500'>
        Página {current + 1} de {total}
      </span>
      <button
        onClick={() => onChange(current + 1)}
        disabled={current >= total - 1}
        className='flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors'
      >
        Siguiente
        <ChevronRight className='w-4 h-4' />
      </button>
    </div>
  )
}

export default PageBar