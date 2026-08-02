import { CheckCircle, XCircle, Info, X } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  title: string
  message: string
  type: string
  onClose: () => void
}

const typeConfig = {
  success: { icon: <CheckCircle className='w-12 h-12 text-green-500' />, bg: 'bg-green-50', border: 'border-green-100' },
  failure: { icon: <XCircle className='w-12 h-12 text-red-500' />, bg: 'bg-red-50', border: 'border-red-100' },
  info: { icon: <Info className='w-12 h-12 text-blue-500' />, bg: 'bg-blue-50', border: 'border-blue-100' },
}

function Modal ({ isOpen, title, message, type, onClose }: ModalProps) {
  if (!isOpen) return null
  const config = typeConfig[type as keyof typeof typeConfig] ?? typeConfig.info

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
      <div className={`bg-white rounded-xl shadow-xl w-80 overflow-hidden border ${config.border}`}>
        <div className='flex items-center justify-between px-4 py-3 border-b border-gray-100'>
          <h4 className='font-semibold text-gray-800 text-sm'>{title}</h4>
          <button onClick={onClose} className='text-gray-400 hover:text-gray-600 cursor-pointer'>
            <X className='w-4 h-4' />
          </button>
        </div>
        <div className={`flex flex-col items-center gap-3 p-6 ${config.bg}`}>
          {config.icon}
          <p className='text-sm text-center text-gray-600'>{message}</p>
        </div>
        <div className='px-4 py-3 flex justify-end border-t border-gray-100'>
          <button
            onClick={onClose}
            className='px-4 py-1.5 rounded-md bg-blue-500 text-white text-sm hover:bg-blue-600 cursor-pointer transition-colors'
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal