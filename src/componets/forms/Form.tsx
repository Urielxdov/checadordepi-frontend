import React, { type ReactNode } from 'react'

interface FormProps {
  children: ReactNode
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function Form ({ children, onSubmit }: FormProps) {
  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-4 shadow-lg p-6 rounded-md'>
      {children}
    </form>
  )
}
