import Card from '../../componets/ui/Card'
import AccessButton from '../../componets/utils/buttons/AccessButton'
import HomeLayout from '../Layouts/HomeLayout'

export default function HomePage () {
  const modules = [
    {
      title: 'Alumno',
      description: 'Operaciones relacionadas con la gestión del alumnado',
      url: '/alumno'
    },
    {
      title: 'Profesor',
      description: 'Operaciones relacionadas con la gestión de profesores',
      url: '/profesor'
    },
    {
      title: 'Curso',
      description: 'Operaciones relacionadas con la administración de cursos',
      url: '/curso'
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
