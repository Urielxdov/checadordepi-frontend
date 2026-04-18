import ComboBox from '../../components/forms/Combo'
import Form from '../../components/forms/Form'
import Input from '../../components/forms/Input'
import Button from '../../components/utils/buttons/Button'
import { type SelectItem } from '../../interfaces/httpModels'
import type { FieldConfig } from '../../utils/Fields'

export interface CreateParameters {
    module: string
    fields: Array<FieldConfig>
    itemsPf?: Array<SelectItem>
    itemsPr?: Array<SelectItem>
    selectPf?: string,
    selectPr?: string,
    onChange: (key: string, value: any) => void
    onSubmit: () => void
}

function Create ({ module, fields, itemsPf, itemsPr, onSubmit, onChange }: CreateParameters) {
  //retorno de vista
  return (
    <>
      <h1 className='font-bold text-xl'>Registrar nuevo {module}</h1>
      <Form id="create-form" onSubmit={onSubmit}>
        {fields.map((f:FieldConfig) => (
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
        {module == 'Alumno' ? <ComboBox name="profesor" id='profesor-select' items={itemsPf ? itemsPf:[]} onChange={onChange} />:""}
        {module == 'Alumno' ? <ComboBox name="programa" id='programa-select' items={itemsPr ? itemsPr:[]} onChange={onChange} />:""}
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
