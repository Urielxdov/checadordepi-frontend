import Card from '../../components/ui/Card'
import AccessButton from '../../components/interactives/buttons/AccessButton'
import HomeLayout from '../../components/ui/HomeLayout'

interface Module {
  title: string
  description: string
  url: string
}

interface EntityModulesProps {
  entity: string
}

export default function EntityModules ({ entity }: EntityModulesProps) {
  const operations = [
    {
      title: 'Consultar',
      description: 'Visualización de ' + entity + ' existente',
      action: 'get'
    },
    {
      title: 'Baja',
      description: 'Cambiar estatus de ' + entity,
      action: 'delete'
    },
    {
      title: 'Registrar',
      description: 'Registrar un ' + entity + ' nuevo al sistema',
      action: 'create'
    },
    {
      title: 'Actualizar',
      description: 'Cambiar información de un ' + entity,
      action: 'update'
    }
  ]

  // Mapea operaciones a módulos con URL dinámica
  const modules: Module[] = operations.map(op => ({
    title: op.title,
    description: op.description,
    url: `/${entity}/${op.action}`
  }))

  return (
    <HomeLayout title={'Modulo '+entity}>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
        {modules.map((module, i) => (
          <Card
            key={i}
            title={module.title}
            description={module.description}
            button={<AccessButton url={module.url} />}
          />
        ))}
      </div>
    </HomeLayout>
  )
}
