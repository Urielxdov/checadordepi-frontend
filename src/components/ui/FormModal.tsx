import { X } from 'lucide-react'
import type { ReactNode } from 'react'

interface FormModalProps {
  title: string
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export default function FormModal ({ title, isOpen, onClose, children }: FormModalProps) {
  if (!isOpen) return null
  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto'>
        <div className='flex items-center justify-between px-5 py-4 border-b border-gray-100 sticky top-0 bg-white'>
          <h2 className='font-semibold text-gray-800'>{title}</h2>
          <button onClick={onClose} className='text-gray-400 hover:text-gray-600 cursor-pointer'>
            <X className='w-5 h-5' />
          </button>
        </div>
        <div className='p-5'>{children}</div>
      </div>
    </div>
  )
}
