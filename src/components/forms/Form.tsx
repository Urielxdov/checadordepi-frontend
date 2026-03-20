import React, { type ReactNode } from 'react'

interface FormProps {
  children: ReactNode
  onSubmit?: () => void
  id: string
}

export default function Form ({ children, onSubmit, id }: FormProps) {
  //componente
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit && onSubmit();
      }}
      id={id}
      className='flex flex-col gap-4 shadow-lg p-6 rounded-md'
    >
      {children}
    </form>
  )
}
