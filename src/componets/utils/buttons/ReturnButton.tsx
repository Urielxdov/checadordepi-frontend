import React from 'react'
import Button from './Button'
import { ArrowLeft } from 'lucide-react'

export default function ReturnButton () {
  return (
    <Button
      text='Regresar'
      action={() => {
        console.log('hola')
      }}
      submit={false}
      icon={<ArrowLeft className='h-5  w-5' />}
      iconPosition='left'
      styles='px-4 py-2 rounded bg-red-500 text-white
      hover:bg-red-600 hover:cursor-pointer 
'
    />
  )
}
