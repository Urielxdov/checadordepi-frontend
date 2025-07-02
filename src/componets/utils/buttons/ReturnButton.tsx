import React from 'react'
import Button from './Button'
import { ArrowLeft } from 'lucide-react'
import { type ReturnButtonConfig } from '../../../interfaces/componentConfig'
import { useNavigate } from 'react-router-dom'

export default function ReturnButton ({ path }:ReturnButtonConfig) {
  //navegacion
  const navigate = useNavigate();

  //componente
  return (
    <Button
      text='Regresar'
      action={() => {
        navigate(path);
      }}
      submit={false}
      icon={<ArrowLeft className='h-5  w-5' />}
      iconPosition='left'
      styles='px-4 py-2 rounded bg-blue-500 text-white
      hover:bg-blue-600 hover:cursor-pointer'
    />
  )
}
