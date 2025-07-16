import Form from '../../componets/forms/Form'
import Input from '../../componets/forms/Input'
import Button from '../../componets/utils/buttons/Button'
import { type CreateParameters } from '../../interfaces/CRUDInterfaces'
import { type FieldProps } from '../../interfaces/componentConfig'

function Create ({ module, fields, onSubmit, onChange }: CreateParameters) {
  //retorno de vista
  return (
    <>
      <h1 className='font-bold text-xl'>Registrar nuevo {module}</h1>
      <Form id="create-form" onSubmit={onSubmit}>
        {fields.map((f: FieldProps) => (
          <Input
            label={f.label}
            name={f.name}
            type={f.type}
            required={true}
            maxLength={f.maxlength ? f.maxlength : 200}
            minLength={f.minlength ? f.minlength : 1}
            value={f.value}
            change={onChange}
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
