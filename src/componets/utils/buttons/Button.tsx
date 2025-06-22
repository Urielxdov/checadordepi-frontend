import React from 'react'

interface ButtonProps {
  text: string
  action: () => void
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  styles?: string
}

export default function Button ({
  text,
  action,
  icon,
  iconPosition = 'left',
  styles = ''
}: ButtonProps) {
  return (
    <button onClick={action} className={`flex items-center gap-2 ${styles}`}>
      {icon && iconPosition === 'left' && icon}
      {text}
      {icon && iconPosition === 'right' && icon}
    </button>
  )
}
