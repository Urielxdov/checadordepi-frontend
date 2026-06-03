import { useNavigate } from "react-router-dom";
import { getFieldsLog } from "../../utils/Fields";
import type { FieldConfig } from "../../utils/Fields";
import { type LoginModel } from "../../interfaces/Models";
import Form from "../../components/interactives/forms/Form";
import Input from "../../components/interactives/forms/Input";
import Button from "../../components/interactives/buttons/Button";
import logoTec from '../../assets/logo_login_tecnm.png';
import logoITL from '../../assets/110053_login.png';
import { useForm } from "../../hooks/reducers/FormReducer";
import { validateAccess } from "../../services/userService";
import { useAuth } from "../../hooks/context/AuthContext";
import { useEffect, useState } from "react";

function LoginView() {
    const jwt = useAuth();
    const { state, handleChange, resetForm } = useForm('Login');
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    const onSubmit = () => {
        setError(null);
        const login = state.data as LoginModel;
        validateAccess(login)
            .then(token => {
                if (token) {
                    jwt.store(token, 2040000);
                    navigate("/home");
                } else {
                    setError("Credenciales inválidas. Intente de nuevo.");
                }
                resetForm();
            })
            .catch(() => {
                setError("Credenciales inválidas. Intente de nuevo.");
                resetForm();
            });
    };

    useEffect(() => {
        jwt.clear();
    }, []);

    return (
        <div className="w-full h-full fixed inset-0 bg-indigo-950 flex items-center justify-center">
            <div className="bg-white rounded-lg w-230 h-150 flex flex-row">
                <div>
                    <img className="h-150 w-100 rounded-lg object-cover" src={logoTec} alt="Logo del tec" />
                </div>
                <div className="flex flex-col grow justify-center">
                    <div className="px-6 py-2">
                        <img src={logoITL} alt="logo itl" className="max-w-100" />
                        <h2 className="text-xl text-left">Sistema de gestion de alumnos</h2>
                    </div>
                    {error && (
                        <p className="mx-6 mb-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
                            {error}
                        </p>
                    )}
                    <Form id="login-form" onSubmit={onSubmit}>
                        {getFieldsLog(state.data as LoginModel).map((f: FieldConfig) => (
                            <Input
                                label={f.label}
                                name={f.name}
                                type={f.type}
                                required={true}
                                maxLength={f.maxlength ? f.maxlength : 200}
                                minLength={f.minlength ? f.minlength : 1}
                                change={handleChange}
                                value={f.value}
                                key={f.name}
                            />
                        ))}
                        <Button
                            text='Acceder'
                            action={() => {}}
                            submit={true}
                            styles='px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 hover:cursor-pointer'
                        />
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default LoginView;
