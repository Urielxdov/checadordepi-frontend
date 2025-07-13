import { useNavigate } from 'react-router-dom'
import { getAuthContext } from '../../hooks/custom/useAuth'
import { LOGINFIELDS } from '../../utils/Fields'
import { type FieldProps } from '../../interfaces/componentConfig'
import { type LoginConfig } from '../../interfaces/ModelsInterfaces'
import Form from '../../componets/forms/Form'
import Input from '../../componets/forms/Input'
import Button from '../../componets/utils/buttons/Button'
import logoTec from '../../assets/logo_login_tecnm.png'
import logoITL from '../../assets/110053_login.png'
import { parseToModel } from '../../utils/parserModels'

function LoginView () {
  //contexto
  const context = getAuthContext()

  //navegacion
  const navigate = useNavigate()

  //obtencion de datos
  const onSubmit = (data: FormData) => {
    const login = parseToModel<LoginConfig>(data)
    //validar acceso
    if (
      (login.user as string) == 'admin' &&
      (login.password as string) == '12345'
    ) {
      alert('Acceso exitoso!!!!')
      context.validate(true)
      navigate('/home')
    } else {
      alert('Credenciales invalidas')
    }
  }

  return (
    <div className='fixed inset-0 bg-indigo-950 flex items-center justify-center'>
      <div className='bg-white rounded-lg w-230 h-150 flex flex-row'>
        <div>
          <img
            className='h-150 w-100 rounded-lg object-cover'
            src={logoTec}
            alt='Logo del tec'
          />
        </div>
        <div className='flex flex-col grow justify-center'>
          <div className='px-6 py-2'>
            <img src={logoITL} alt='logo itl' className='max-w-100' />
            <h2 className='text-xl text-left'>Sistema de gestion de alumnos</h2>
          </div>
          <Form id='login-form' onSubmit={onSubmit}>
            {LOGINFIELDS.map((f: FieldProps) => (
              <Input
                label={f.label}
                name={f.name}
                type={f.type}
                required={true}
                maxLength={f.maxlength ? f.maxlength : 200}
                minLength={f.minlength ? f.minlength : 1}
                key={f.name}
              />
            ))}
            <Button
              text='Acceder'
              action={() => {}}
              submit={true}
              styles='px-4 py-2 rounded bg-blue-500 text-white
                            hover:bg-blue-600 hover:cursor-pointer'
            />
          </Form>
        </div>
      </div>
    </div>
  )
}

export default LoginView
