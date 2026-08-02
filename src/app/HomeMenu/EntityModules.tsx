import Card from '../../components/ui/Card'
import AccessButton from '../../components/interactives/buttons/AccessButton'
import HomeLayout from '../../components/ui/HomeLayout'
import { Eye, UserMinus, UserPlus, Edit, FileCheck } from 'lucide-react'
import type { ReactNode } from 'react'

interface Module {
  title: string
  description: string
  url: string
  icon: ReactNode
}

interface EntityModulesProps {
  entity: string
}

export default function EntityModules ({ entity }: EntityModulesProps) {
  const operations = [
    {
      title: 'Consultar',
      description: 'Visualización de ' + entity + ' existente',
      action: 'get',
      icon: <Eye className='w-5 h-5' />
    },
    {
      title: 'Baja',
      description: 'Cambiar estatus de ' + entity,
      action: 'delete',
      icon: <UserMinus className='w-5 h-5' />
    },
    {
      title: 'Registrar',
      description: 'Registrar un ' + entity + ' nuevo al sistema',
      action: 'create',
      icon: <UserPlus className='w-5 h-5' />
    },
    {
      title: 'Actualizar',
      description: 'Cambiar información de un ' + entity,
      action: 'update',
      icon: <Edit className='w-5 h-5' />
    }
  ]

  const modules: Module[] = operations.map(op => ({
    title: op.title,
    description: op.description,
    url: `/${entity}/${op.action}`,
    icon: op.icon
  }))

  return (
    <HomeLayout title={'Módulo ' + entity}>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {modules.map((module, i) => (
          <Card
            key={i}
            title={module.title}
            description={module.description}
            icon={module.icon}
            button={<AccessButton url={module.url} />}
          />
        ))}
        {entity === 'alumno' ? (
          <Card
            title='Justificación'
            description='Justificar incidencia de un alumno'
            icon={<FileCheck className='w-5 h-5' />}
            button={<AccessButton url='/alumno/justify' />}
          />
        ) : null}
      </div>
    </HomeLayout>
  )
}
