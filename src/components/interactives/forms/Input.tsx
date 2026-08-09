interface InputProps {
  label: string
  name: string
  type?: string
  placeholder?: string
  required?: boolean
  minLength?: number
  maxLength?: number
  value?: any
  error?: string
  change: (key: string, value: any) => void
}

export default function Input (configuration: InputProps) {
  const hasError = Boolean(configuration.error)

  return (
    <div className='flex flex-col gap-2 text-left'>
      <label className='font-bold' htmlFor={configuration.name}>
        {configuration.label}
      </label>
      <input
        className={`border py-1 px-3 rounded-sm focus:outline-none focus:ring-2 ${hasError ? 'border-red-600 focus:ring-red-200' : 'border-gray-600 focus:ring-blue-200'}`}
        id={configuration.name}
        name={configuration.name}
        type={configuration.type}
        placeholder={configuration.placeholder}
        required={configuration.required}
        minLength={configuration.minLength}
        maxLength={configuration.maxLength}
        value={configuration.value}
        onChange={e => configuration.change(e.target.name, e.target.files ? e.target.files[0]: e.target.value)}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${configuration.name}-error` : undefined}
      />
      {configuration.error && (
        <p id={`${configuration.name}-error`} className='text-sm text-red-600'>
          {configuration.error}
        </p>
      )}
    </div>
  )
}
