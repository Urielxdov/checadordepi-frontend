import { useState, useEffect } from 'react'
import { Plus, FileCheck } from 'lucide-react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import HomeLayout from '../../components/ui/HomeLayout'
import { Table } from '../../components/ui/tables/Table'
import PageBar from '../../components/ui/pageBar'
import FormModal from '../../components/ui/FormModal'
import ConfirmModal from '../../components/ui/ConfirmModal'
import Modal from '../../components/ui/Modals'
import Form from '../../components/interactives/forms/Form'
import Input from '../../components/interactives/forms/Input'
import ComboBox from '../../components/interactives/forms/Combo'
import CheckBox from '../../components/interactives/inputs/Checkbox'
import QueryInput from '../../components/interactives/inputs/QueryInput'
import { ALUMNOHEADERS } from '../../utils/Headers'
import { getFieldsAlu } from '../../utils/Fields'
import type { AlumnoModel } from '../../interfaces/Models'
import type { SelectItem } from '../../interfaces/httpModels'
import { useStudents } from '../../hooks/queries/useStudents'
import { useCreateStudent, useUpdateStudent, useDeleteStudent } from '../../hooks/mutations/useStudentMutations'
import { useTeachersSelect } from '../../hooks/queries/useTeachers'
import { useProgramsSelect } from '../../hooks/queries/usePrograms'
import { useForm } from '../../hooks/reducers/FormReducer'
import debounce from '../../utils/Debounce'

export default function AlumnoPage () {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 0)
  const { data, isLoading } = useStudents(page)
  const { mutate: create } = useCreateStudent()
  const { mutate: update } = useUpdateStudent()
  const { mutate: remove } = useDeleteStudent()
  const { data: teacherItems } = useTeachersSelect()
  const { data: programItems } = useProgramsSelect()
  const { state, handleChange, setValue, resetForm } = useForm('Alumno')

  const [search, setSearch] = useState<AlumnoModel | undefined>()
  const [createOpen, setCreateOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<AlumnoModel | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [updateFoto, setUpdateFoto] = useState(false)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const [failMsg, setFailMsg] = useState<string | null>(null)

  const itemsPf: SelectItem[] = [
    { key: 'default', fullName: '-- seleccione un profesor --' },
    ...(teacherItems ?? [])
  ]
  const itemsPr: SelectItem[] = [
    { key: 'default', fullName: '-- seleccione un programa --' },
    ...(programItems ?? [])
  ]

  useEffect(() => {
    if (editTarget) setValue(editTarget)
  }, [editTarget])

  const onSearch = (id: string) => setSearch(data?.data.find(s => s.id === id))

  const onSubmitCreate = debounce(() => {
    const alumno = state.data as AlumnoModel
    alumno.status = 'Activo'
    create({ student: alumno, foto: alumno.foto as File }, {
      onSuccess: (r) => {
        if (r.success) { setSuccessMsg('Alumno registrado correctamente'); setCreateOpen(false) }
        else setFailMsg('No se pudo registrar el alumno')
        resetForm()
      },
      onError: () => { setFailMsg('No se pudo registrar el alumno'); resetForm() }
    })
  }, 500)

  const onSubmitUpdate = debounce(() => {
    const alumno = state.data as AlumnoModel
    update({ student: alumno, foto: updateFoto ? alumno.foto as File : undefined }, {
      onSuccess: (r) => {
        if (r.success) { setSuccessMsg('Alumno actualizado correctamente'); setEditTarget(null); resetForm() }
        else setFailMsg('No se pudo actualizar el alumno')
      },
      onError: () => setFailMsg('No se pudo actualizar el alumno')
    })
  }, 500)

  const onConfirmDelete = debounce(() => {
    if (!deleteId) return
    remove(deleteId, {
      onSuccess: (r) => {
        if (r.success) { setSuccessMsg('Alumno dado de baja'); setSearch(undefined) }
        else setFailMsg('No se pudo dar de baja el alumno')
        setDeleteId(null)
      },
      onError: () => { setFailMsg('No se pudo dar de baja el alumno'); setDeleteId(null) }
    })
  }, 500)

  const displayData = search ? [search] : (data?.data ?? [])

  return (
    <HomeLayout title='Alumnos'>
      <div className='flex items-center gap-3 flex-wrap'>
        <div className='flex-1 min-w-48'>
          <QueryInput action={onSearch} placeholder='Buscar por número de control' />
        </div>
        <div className='flex gap-2 shrink-0'>
          <button
            onClick={() => navigate('/alumno/justify')}
            className='flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors'
          >
            <FileCheck className='w-4 h-4' />
            Incidencias
          </button>
          <button
            onClick={() => { resetForm(); setCreateOpen(true) }}
            className='flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 cursor-pointer transition-colors'
          >
            <Plus className='w-4 h-4' />
            Registrar
          </button>
        </div>
      </div>

      {isLoading ? (
        <p className='text-center text-gray-400 py-8'>Cargando...</p>
      ) : (
        <Table
          header={ALUMNOHEADERS}
          body={displayData}
          action='actions'
          func={(id) => setDeleteId(id)}
          onEdit={(id) => {
            const found = data?.data.find(s => s.id === id)
            if (found) setEditTarget(found)
          }}
        />
      )}

      <PageBar
        current={page}
        total={data?.total ?? 0}
        onChange={(p) => setSearchParams({ page: String(p) })}
      />

      <FormModal title='Registrar alumno' isOpen={createOpen} onClose={() => setCreateOpen(false)}>
        <Form id='create-alu' onSubmit={onSubmitCreate}>
          {getFieldsAlu(state.data as AlumnoModel).map(f => (
            <Input key={f.name} label={f.label} name={f.name} type={f.type}
              required maxLength={f.maxlength ?? 200} minLength={f.minlength ?? 1}
              value={f.value} change={handleChange}
            />
          ))}
          <ComboBox name='profesor' id='cre-pf' items={itemsPf} onChange={handleChange} />
          <ComboBox name='programa' id='cre-pr' items={itemsPr} onChange={handleChange} />
          <button type='submit' className='px-4 py-2 rounded-md bg-blue-500 text-white text-sm hover:bg-blue-600 cursor-pointer transition-colors w-fit'>
            Registrar
          </button>
        </Form>
      </FormModal>

      <FormModal title='Actualizar alumno' isOpen={!!editTarget} onClose={() => { setEditTarget(null); resetForm() }}>
        <Form id='edit-alu' onSubmit={onSubmitUpdate}>
          {getFieldsAlu(state.data as AlumnoModel)
            .slice(1, updateFoto ? undefined : 7)
            .map(f => (
              <Input key={f.name} label={f.label} name={f.name} type={f.type}
                required maxLength={f.maxlength ?? 200} minLength={f.minlength ?? 1}
                value={f.value} change={handleChange}
              />
            ))}
          <ComboBox name='profesor' id='upd-pf'
            select={(state.data as AlumnoModel).profesor}
            items={itemsPf} onChange={handleChange}
          />
          <ComboBox name='programa' id='upd-pr'
            select={(state.data as AlumnoModel).programa}
            items={itemsPr} onChange={handleChange}
          />
          <CheckBox text='Actualizar foto' onChange={setUpdateFoto} />
          <button type='submit' className='px-4 py-2 rounded-md bg-green-500 text-white text-sm hover:bg-green-600 cursor-pointer transition-colors w-fit'>
            Actualizar
          </button>
        </Form>
      </FormModal>

      <ConfirmModal
        isOpen={!!deleteId}
        title='Confirmar baja'
        message='¿Dar de baja este alumno? El estatus cambiará a Inactivo.'
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
