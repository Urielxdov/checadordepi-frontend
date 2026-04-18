import Card from '../../components/ui/Card'
import AccessButton from '../../components/utils/buttons/AccessButton'
import HomeLayout from '../Layouts/HomeLayout'

export default function HomePage () {
  const modules = [
    {
      title: 'Alumno',
      description: 'Operaciones relacionadas con la gestión del alumnado',
      url: '/alumno'
    },
    {
      title: 'Asesor',
      description: 'Operaciones relacionadas con la gestión de profesores',
      url: '/asesor'
    },
    {
      title: 'Programa',
      description: 'Operaciones relacionadas con la administración de cursos',
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
