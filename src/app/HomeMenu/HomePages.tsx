import Card from '../../components/ui/Card'
import AccessButton from '../../components/interactives/buttons/AccessButton'
import HomeLayout from '../../components/ui/HomeLayout'

export default function HomePage () {
  const modules = [
    {
      title: 'Alumno',
      description: 'Operaciones relacionadas con la gestión del alumnado',
      url: '/alumno'
    },
    {
      title: 'Asesor',
      description: 'Operaciones relacionadas con la gestión de asesores',
      url: '/asesor'
    },
    {
      title: 'Programa',
      description: 'Operaciones relacionadas con la administración de programas',
      url: '/programa'
    }
  ]

  return (
    <HomeLayout title='Panel principal'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
        {modules.map((module, index) => (
          <Card
            key={index}
            title={module.title}
            description={module.description}
            button={<AccessButton url={module.url} />}
          />
        ))}
      </div>
    </HomeLayout>
  )
}
