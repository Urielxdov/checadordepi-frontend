import { useNavigate } from "react-router-dom";
import { getFieldsLog } from "../../utils/Fields";
import type { FieldConfig } from "../../interfaces/componentConfig";
import { type LoginConfig } from "../../interfaces/ModelsInterfaces";
import Form from "../../componets/forms/Form";
import Input from "../../componets/forms/Input";
import Button from "../../componets/utils/buttons/Button";
import logoTec from '../../assets/logo_login_tecnm.png';
import logoITL from '../../assets/110053_login.png';
import { useForm } from "../../hooks/reducers/FormReducer";
import { validateAccess } from "../../services/userService";
import { useAuth } from "../../hooks/custom/useAuth";

function LoginView(){
    //contexto de autenticado
    const jwt = useAuth();

    //hook de formulario
    const { state, handleChange, resetForm } = useForm('Login');

    //navegacion
    const navigate = useNavigate();

    //obtencion de datos
    const onSubmit = () => {
        const login = state.data as LoginConfig
        //validar acceso
        validateAccess(login).then(token => {
            if(token){
                alert("bienvenido "+login.user);
                jwt.store(token, 2040000);
                navigate("/home");
            }else{
                alert("credenciales invalidas!!!");
            }
            resetForm();
        }).catch(e => {alert("credenciales invalidas!!!!"); console.log(e); resetForm();});
    }

    return(
        <div className="fixed inset-0 bg-indigo-950 flex items-center justify-center">
            <div className="bg-white rounded-lg w-230 h-150 flex flex-row">
                <div>
                    <img className="h-150 w-100 rounded-lg object-cover" src={logoTec} alt="Logo del tec" />
                </div>
                <div className="flex flex-col grow justify-center">
                    <div className="px-6 py-2">
                        <img src={logoITL} alt="logo itl" className="max-w-100"/>
                        <h2 className="text-xl text-left">Sistema de gestion de alumnos</h2>
                    </div>
                    <Form id="login-form" onSubmit={onSubmit}>
                        {getFieldsLog(state.data as LoginConfig).map((f:FieldConfig) => (
                            <Input
                                label={f.label}
                                name={f.name}
                                type={f.type}
                                required={true}
                                maxLength={f.maxlength?f.maxlength:200}
                                minLength={f.minlength?f.minlength:1}
                                change={handleChange}
                                value={f.value}
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
