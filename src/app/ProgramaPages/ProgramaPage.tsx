import { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import HomeLayout from '../../components/ui/HomeLayout'
import { Table } from '../../components/ui/tables/Table'
import PageBar from '../../components/ui/pageBar'
import FormModal from '../../components/ui/FormModal'
import ConfirmModal from '../../components/ui/ConfirmModal'
import Modal from '../../components/ui/Modals'
import Form from '../../components/interactives/forms/Form'
import Input from '../../components/interactives/forms/Input'
import QueryInput from '../../components/interactives/inputs/QueryInput'
import { PROGRAMAHEADERS } from '../../utils/Headers'
import { getFieldsProg } from '../../utils/Fields'
import type { ProgramaModel } from '../../interfaces/Models'
import { usePrograms } from '../../hooks/queries/usePrograms'
import { useCreateProgram, useUpdateProgram, useDeleteProgram } from '../../hooks/mutations/useProgramMutations'
import { useForm } from '../../hooks/reducers/FormReducer'
import debounce from '../../utils/Debounce'
import { errorMessage, formatApiMessage } from '../../services/apiErrors'

export default function ProgramaPage () {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 0)
  const { data, isLoading, isError, error } = usePrograms(page)
  const { mutate: create } = useCreateProgram()
  const { mutate: update } = useUpdateProgram()
  const { mutate: remove } = useDeleteProgram()
  const { state, handleChange, setValue, resetForm } = useForm('Programa')

  const [search, setSearch] = useState<ProgramaModel | undefined>()
  const [createOpen, setCreateOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<ProgramaModel | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const [failMsg, setFailMsg] = useState<string | null>(null)

  useEffect(() => {
    if (editTarget) setValue(editTarget)
  }, [editTarget])

  const onSearch = (id: string) => setSearch(data?.data.find(p => p.id === id))

  const onSubmitCreate = debounce(() => {
    const programa = state.data as ProgramaModel
    programa.status = 'Activo'
    create(programa, {
      onSuccess: (r) => {
        if (r.success) { setSuccessMsg('Programa registrado correctamente'); setCreateOpen(false) }
        else setFailMsg(formatApiMessage(r, 'No se pudo registrar el programa'))
        resetForm()
      },
      onError: (error) => { setFailMsg(errorMessage(error, 'No se pudo registrar el programa')); resetForm() }
    })
  }, 500)

  const onSubmitUpdate = debounce(() => {
    const programa = state.data as ProgramaModel
    if (programa.status === 'Permiso') programa.status = 'Inactivo'
    update(programa, {
      onSuccess: (r) => {
        if (r.success) { setSuccessMsg('Programa actualizado correctamente'); setEditTarget(null); resetForm() }
        else setFailMsg(formatApiMessage(r, 'No se pudo actualizar el programa'))
      },
      onError: (error) => setFailMsg(errorMessage(error, 'No se pudo actualizar el programa'))
    })
  }, 500)

  const onConfirmDelete = debounce(() => {
    if (!deleteId) return
    remove(deleteId, {
      onSuccess: (r) => {
        if (r.success) { setSuccessMsg('Programa dado de baja'); setSearch(undefined) }
        else setFailMsg(formatApiMessage(r, 'No se pudo dar de baja el programa'))
        setDeleteId(null)
      },
      onError: (error) => { setFailMsg(errorMessage(error, 'No se pudo dar de baja el programa')); setDeleteId(null) }
    })
  }, 500)

  const displayData = search ? [search] : (data?.data ?? [])

  return (
    <HomeLayout title='Programas'>
      <div className='flex items-center gap-3 flex-wrap'>
        <div className='flex-1 min-w-48'>
          <QueryInput action={onSearch} placeholder='Buscar por ID de programa' />
        </div>
        <button
          onClick={() => { resetForm(); setCreateOpen(true) }}
          className='flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 cursor-pointer transition-colors shrink-0'
        >
          <Plus className='w-4 h-4' />
          Registrar
        </button>
      </div>

      {isError ? (
        <p className='text-center text-red-600 bg-red-50 border border-red-100 rounded-md py-3 px-4'>
          {errorMessage(error, 'No se pudieron cargar los programas')}
        </p>
      ) : isLoading ? (
        <p className='text-center text-gray-400 py-8'>Cargando...</p>
      ) : (
        <Table
          header={PROGRAMAHEADERS}
          body={displayData}
          action='actions'
          func={(id) => setDeleteId(id)}
          onEdit={(id) => {
            const found = data?.data.find(p => p.id === id)
            if (found) setEditTarget(found)
          }}
        />
      )}

      <PageBar
        current={page}
        total={data?.total ?? 0}
        onChange={(p) => setSearchParams({ page: String(p) })}
      />

      <FormModal title='Registrar programa' isOpen={createOpen} onClose={() => setCreateOpen(false)}>
        <Form id='create-prog' onSubmit={onSubmitCreate}>
          {getFieldsProg(state.data as ProgramaModel).map(f => (
            <Input key={f.name} label={f.label} name={f.name} type={f.type}
              required maxLength={f.maxlength ?? 200} minLength={f.minlength ?? 1}
              value={f.value} change={handleChange}
            />
          ))}
          <button type='submit' className='px-4 py-2 rounded-md bg-blue-500 text-white text-sm hover:bg-blue-600 cursor-pointer transition-colors w-fit'>
            Registrar
          </button>
        </Form>
      </FormModal>

      <FormModal title='Actualizar programa' isOpen={!!editTarget} onClose={() => { setEditTarget(null); resetForm() }}>
        <Form id='edit-prog' onSubmit={onSubmitUpdate}>
          {getFieldsProg(state.data as ProgramaModel).slice(1).map(f => (
            <Input key={f.name} label={f.label} name={f.name} type={f.type}
              required maxLength={f.maxlength ?? 200} minLength={f.minlength ?? 1}
              value={f.value} change={handleChange}
            />
          ))}
          <button type='submit' className='px-4 py-2 rounded-md bg-green-500 text-white text-sm hover:bg-green-600 cursor-pointer transition-colors w-fit'>
            Actualizar
          </button>
        </Form>
      </FormModal>

      <ConfirmModal
        isOpen={!!deleteId}
        title='Confirmar baja'
        message='¿Dar de baja este programa? El estatus cambiará a Inactivo.'
        onConfirm={onConfirmDelete}
        onCancel={() => setDeleteId(null)}
      />

      <Modal title='Operación exitosa' message={successMsg ?? ''} type='success'
        isOpen={!!successMsg} onClose={() => setSuccessMsg(null)} />
      <Modal title='Error' message={failMsg ?? ''} type='failure'
        isOpen={!!failMsg} onClose={() => setFailMsg(null)} />
    </HomeLayout>
  )
}
