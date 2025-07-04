import QueryInput from "../../componets/utils/Inputs/QueryInput";
import Form from "../../componets/forms/Form";
import { type UpdateParameters } from "../../interfaces/CRUDInterfaces";
import { type FieldProps } from "../../interfaces/componentConfig";
import Input from "../../componets/forms/Input";
import Button from "../../componets/utils/buttons/Button";

function Update({module, entity, fields, onSearch, onUpdate}:UpdateParameters){
    if(!entity){
        return (
            <>
                <QueryInput placeholder={'buscar '+module} action={onSearch}/>
                sin registros
            </>
        );
    }else{
        return (
        <>
            <QueryInput placeholder={'buscar '+module} action={onSearch}/>
            <Form onSubmit={onUpdate}>
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
                    styles="p-1 text-white bg-green-500 rounded-sm
                    hover: bg-green-600 hover: cursor-pointer
                    "
                />
            </Form>
        </>
        );
    }
}

export default Update;