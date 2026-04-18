import Button from './Button'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface PropsAccessButton {
  url: string
}

export default function AccessButton ({ url }: PropsAccessButton) {
  const navigate = useNavigate()

  return (
    <Button
      text={'Ingresar'}
      action={() => navigate(url)}
      submit={false}
      icon={<ArrowRight className='h-5  w-5' />}
      iconPosition='right'
      styles='px-4 py-2 rounded bg-blue-500 text-white
      hover:bg-blue-600 hover:cursor-pointer'
    />
  )
}
