import Form from '../../componets/forms/Form'
import Input from '../../componets/forms/Input'
import Button from '../../componets/utils/buttons/Button'

export interface FieldProps {
  label: string
  name: string
  type: string
  maxlength?: number
  minlength?: number
  value?: string | File
}

export interface CreateParameters {
  module: string
  fields: Array<FieldProps>
  onSubmit: (data: FormData) => void
}

function Create ({ module, fields, onSubmit }: CreateParameters) {
  const ID_FORM = 'form-data'
  //retorno de vista
  return (
    <>
      <h1 className='font-bold text-xl'>Registrar nuevo {module}</h1>
      <Form onSubmit={onSubmit} id={ID_FORM}>
        {fields.map((f: FieldProps) => (
          <Input
            label={f.label}
            name={f.name}
            type={f.type}
            required={true}
            maxLength={f.maxlength ? f.maxlength : 200}
            minLength={f.minlength ? f.minlength : 1}
            value={f.value ? f.value : null}
            key={f.name}
          />
        ))}
        <Button
          text='registrar'
          action={() => {}}
          submit={true}
          styles='p-1 text-white bg-green-500 rounded-sm
                    hover: bg-green-600 hover: cursor-pointer
                    '
        />
      </Form>
    </>
  )
}

export default Create
