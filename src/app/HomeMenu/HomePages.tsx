import Card from '../../components/ui/Card'
import AccessButton from '../../components/interactives/buttons/AccessButton'
import HomeLayout from '../../components/ui/HomeLayout'
import { Users, UserCheck, BookOpen } from 'lucide-react'

export default function HomePage () {
  const modules = [
    {
      title: 'Alumno',
      description: 'Gestión del alumnado',
      url: '/alumno',
      icon: <Users className='w-5 h-5' />
    },
    {
      title: 'Asesor',
      description: 'Gestión de asesores',
      url: '/asesor',
      icon: <UserCheck className='w-5 h-5' />
    },
    {
      title: 'Programa',
      description: 'Administración de programas',
      url: '/programa',
      icon: <BookOpen className='w-5 h-5' />
    }
  ]

  return (
    <HomeLayout title='Panel principal'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {modules.map((module, index) => (
          <Card
            key={index}
            title={module.title}
            description={module.description}
            icon={module.icon}
            button={<AccessButton url={module.url} />}
          />
        ))}
      </div>
    </HomeLayout>
  )
}
