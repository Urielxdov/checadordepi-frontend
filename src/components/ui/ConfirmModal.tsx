import { AlertTriangle } from 'lucide-react'

interface ConfirmModalProps {
  isOpen: boolean
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmModal ({ isOpen, title, message, onConfirm, onCancel }: ConfirmModalProps) {
  if (!isOpen) return null
  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-xl shadow-xl w-80 overflow-hidden border border-amber-100'>
        <div className='flex flex-col items-center gap-3 p-6 bg-amber-50'>
          <AlertTriangle className='w-12 h-12 text-amber-500' />
          <div className='text-center'>
            <h4 className='font-semibold text-gray-800 text-sm'>{title}</h4>
            <p className='text-sm text-gray-600 mt-1'>{message}</p>
          </div>
        </div>
        <div className='flex gap-2 justify-end px-4 py-3 border-t border-gray-100'>
          <button
            onClick={onCancel}
            className='px-4 py-1.5 rounded-md text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors'
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className='px-4 py-1.5 rounded-md text-sm font-medium bg-red-500 text-white hover:bg-red-600 cursor-pointer transition-colors'
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  )
}
