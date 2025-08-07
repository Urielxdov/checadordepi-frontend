import Button from "./Button";

interface DeleteButtonConfig{
    action: () => void
}

function DeleteButton({ action }:DeleteButtonConfig){
    return (
        <Button
            text="eliminar"
            action={action}
            submit={false}
            styles="p-1 text-white bg-red-500 rounded-sm
                hover: bg-red-600 hover: cursor-pointer
                "
        />
    );
}

export default DeleteButton;