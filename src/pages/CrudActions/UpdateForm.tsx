import ComboBox from '../../componets/forms/Combo'
import Form from '../../componets/forms/Form'
import Input from '../../componets/forms/Input'
import Button from '../../componets/utils/buttons/Button'
import { type CreateParameters } from '../../interfaces/CRUDInterfaces'
import { type FieldConfig } from '../../interfaces/componentConfig'

function UpdateForm ({ module, fields, itemsPf, itemsPr, selectPf, selectPr, onSubmit, onChange }: CreateParameters) {
  //retorno de vista
  return (
    <>
      <h1 className='font-bold text-xl'>Actualizar {module}</h1>
      <Form id="create-form" onSubmit={onSubmit}>
        {fields.map((f: FieldConfig) => (
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
        {module == 'Alumno' ? <ComboBox name="profesor" id='profesor-select' select={selectPf as string} items={itemsPf ? itemsPf:[]} onChange={onChange} />:""}
        {module == 'Alumno' ? <ComboBox name="programa" id='programa-select' select={selectPr as string} items={itemsPr ? itemsPr:[]} onChange={onChange} />:""}
        <Button
          text='actualizar'
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

export default UpdateForm