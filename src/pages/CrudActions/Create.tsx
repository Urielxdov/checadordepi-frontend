import Form from "../../componets/forms/Form";
import Input from "../../componets/forms/Input";
import Button from "../../componets/utils/buttons/Button";
import HomeLayout from "../Layouts/HomeLayout";
import { type CreateParameters } from "../../interfaces/CRUDInterfaces";
import { type FieldProps } from "../../interfaces/componentConfig";

function Create({ title, entity, fields, formHandler }:CreateParameters){

    //retorno de vista
    return (
        <HomeLayout title={title}>
                <h1 className="font-bold text-xl">Registrar nuevo {entity}</h1>
                <Form onSubmit={formHandler}>
                    {fields.map((f:FieldProps) => 
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
                    )}
                    <Button
                        text="registrar"
                        action={() => {}}
                        submit={true}
                        styles="p-1 text-white bg-green-500 rounded-sm"
                    />
                </Form>
            </HomeLayout>
    );
}

export default Create;