import React, { type ReactNode } from 'react'

interface FormProps {
  children: ReactNode
}

export default function Form ({ children }: FormProps) {
  return (
    <form className='flex flex-col gap-4 shadow-lg p-6 rounded-md'>
      {children}
    </form>
  )
}
