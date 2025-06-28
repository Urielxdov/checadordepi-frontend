import { useState} from "react";
import Form from "../../componets/forms/Form";
import Input from "../../componets/forms/Input";
import Button from "../../componets/utils/buttons/Button";
import HomeLayout from "../Layouts/HomeLayout";
import Modal from "../../componets/ui/Modals";

interface FieldProps {
    label: string
    name: string
    type: string
    maxlength?: number
    minlength?: number
    value: any
    catch: (value:any) => void
}

interface ModalConfig {
    title:string
    message:string
    type:string
}

interface CreateParameters {
    title: string
    entity: string
    fields: Array<FieldProps>
    formHandler: (e: React.FormEvent<HTMLFormElement>) => void
    modalConf: ModalConfig
}

function Create({ title, entity, fields, formHandler, modalConf }:CreateParameters){
    //hook de modal
    const [modalOpen, setModalOpen] = useState(false);

    const form = (e: React.FormEvent<HTMLFormElement>) => {
        formHandler(e);
        setModalOpen(true);
    }

    //retorno de vista
    return (
        <>
        <HomeLayout title={title}>
                <h1 className="font-bold text-xl">Registrar nuevo {entity}</h1>
                <Form onSubmit={form}>
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
            <Modal
                isOpen={modalOpen}
                title={modalConf.title}
                message={modalConf.message}
                type={modalConf.type}
                onClose={() => setModalOpen(false)}
            />
        </>
    );
}

export default Create;