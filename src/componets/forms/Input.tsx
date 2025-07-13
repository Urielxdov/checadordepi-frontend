interface InputProps {
  label: string
  name: string
  type?: string
  placeholder?: string
  required?: boolean
  minLength?: number
  maxLength?: number
  value: string | File | null
}

export default function Input (configuration: InputProps) {
  const isFileInput = configuration.type === 'file'

  return (
    <div className='flex flex-col gap-2 text-left'>
      <label className='font-bold' htmlFor={configuration.name}>
        {configuration.label}
      </label>
      <input
        className='border border-gray-600 py-1 px-3 rounded-sm'
        id={configuration.name}
        name={configuration.name}
        type={configuration.type}
        placeholder={configuration.placeholder}
        required={configuration.required}
        minLength={configuration.minLength}
        maxLength={configuration.maxLength}
        accept={isFileInput ? 'image/*' : undefined} // opcional, para restringir a imágenes
        {...(!isFileInput && typeof configuration.value === 'string'
          ? { defaultValue: configuration.value }
          : {})}
      />
    </div>
  )
}
