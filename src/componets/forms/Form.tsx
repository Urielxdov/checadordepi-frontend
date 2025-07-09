import React, { type ReactNode } from 'react'

interface FormProps {
  children: ReactNode
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
  id: string
}

export default function Form ({ children, onSubmit, id }: FormProps) {
  return (
    <form
      onSubmit={onSubmit}
      id={id}
      className='flex flex-col gap-4 shadow-lg p-6 rounded-md'
    >
      {children}
    </form>
  )
}
