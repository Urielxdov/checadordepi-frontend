import React from 'react'

interface InputProps {
  label: string
  name: string
  type?: string
  placeholder?: string
  required?: boolean
  minLength?: number
  maxLength?: number
}

export default function Input (configuration: InputProps) {
  return (
    <div className='flex flex-col gap-2 text-left'>
      <label htmlFor={configuration.name}>{configuration.label}</label>
      <input
        className='border border-gray-600 py-1 px-3 rounded-sm'
        id={configuration.name}
        name={configuration.name}
        type={configuration.type}
        placeholder={configuration.placeholder}
        required={configuration.required}
        minLength={configuration.minLength}
        maxLength={configuration.maxLength}
      />
    </div>
  )
}
