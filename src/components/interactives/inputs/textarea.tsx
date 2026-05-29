interface InputProps {
  label: string
  name: string
  placeholder?: string
  required?: boolean
  minLength?: number
  maxLength?: number
  value?: any
  change: (key: string, value: any) => void
}

export default function TextArea (configuration: InputProps) {
  return (
    <div className='flex flex-col gap-2 text-left'>
      <label className='font-bold' htmlFor={configuration.name}>
        {configuration.label}
      </label>
      <textarea
        cols={64}
        rows={8}
        className='border border-gray-600 py-1 px-3 rounded-sm'
        id={configuration.name}
        name={configuration.name}
        placeholder={configuration.placeholder}
        required={configuration.required}
        minLength={configuration.minLength}
        maxLength={configuration.maxLength}
        value={configuration.value}
        onChange={e => configuration.change(e.target.name, e.target.value)}
      ></textarea>
    </div>
  )
}