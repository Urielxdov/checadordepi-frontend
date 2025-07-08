import { useNavigate } from "react-router-dom";
import { getAuthContext } from "../../hooks/custom/useAuth";
import { type FieldProps } from "../../interfaces/componentConfig";
import Form from "../../componets/forms/Form";
import Input from "../../componets/forms/Input";
import Button from "../../componets/utils/buttons/Button";
import logoTec from '../../assets/logo_login_tecnm.png';
import logoITL from '../../assets/110053_login.png';
import useForm, { type LoginConfig } from "../../hooks/reducers/FormReducer";

function LoginView(){
    //contexto
    const context = getAuthContext();

    //navegacion
    const navigate = useNavigate();

    //hook de formulario
    const {state, handleChange} = useForm<LoginConfig>("Login");

    //manejo de formulario
    const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
        //para no recargar la pagina
        e.preventDefault();

        //validar acceso
        if(state.user=='admin'&&state.pass=='12345'){
            alert("Acceso exitoso!!!!");
            context.validate(true);
            navigate('/home');
        }else{
            alert("Credenciales invalidas");
        }
    }

    //campos del formulario
    const fields = [
        {
            label:"Usuario",
            name:"user",
            type:"text",
            maxlength: 10,
            minlength: 0,
            value: state.user,
            catch: handleChange
        },
        {
            label:"Contraseña",
            name:"pass",
            type:"password",
            maxlength: 10,
            minlength: 0,
            value: state.pass,
            catch: handleChange
        }
    ]

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
                    <Form onSubmit={handleForm}>
                        {fields.map((f:FieldProps) => (
                            <Input
                                label={f.label}
                                name={f.name}
                                type={f.type}
                                required={true}
                                maxLength={f.maxlength?f.maxlength:200}
                                minLength={f.minlength?f.minlength:1}
                                value={f.value}
                                catcher={f.catch}
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
    );
}

export default LoginView;