import React from 'react'

interface ButtonProps {
  text: string
  action: (() => void) | ((e: React.MouseEvent<HTMLButtonElement>) => void)
  submit: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  styles?: string
}

export default function Button ({
  text,
  action,
  submit,
  icon,
  iconPosition = 'left',
  styles = ''
}: ButtonProps) {
  return (
    <button onClick={action} className={`flex items-center gap-2 ${styles}`} type={submit?'submit':'button'}>
      {icon && iconPosition === 'left' && icon}
      <span className='grow'>{text}</span>
      {icon && iconPosition === 'right' && icon}
    </button>
  )
}
