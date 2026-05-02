import React from 'react'

interface ButtonProps {
  text: string
  action: () => void
  submit?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  styles?: string
}

export default function Button ({
  text,
  action,
  submit = false,
  icon,
  iconPosition = 'left',
  styles = ''
}: ButtonProps) {
  return (
    <button onClick={action} className={`flex items-center gap-2 ${styles}`} type={submit?'submit':'button'}>
      {icon ? <span className={iconPosition=='left'?'order-1':'order-3'}>{icon}</span>:null}
      <span className='grow order-2'>{text}</span>
    </button>
  )
}
