import React from 'react'
import Button from './Button'
import { ArrowRight } from 'lucide-react'

export default function AccessButton () {
  return (
    <Button
      text={'Ingresar'}
      action={() => {
        console.log('hola')
      }}
      icon={<ArrowRight className='h-5  w-5' />}
      iconPosition='left'
      styles='px-4 py-2 rounded bg-blue-500 text-white
      hover:bg-blue-600 hover:cursor-pointer'
    />
  )
}
