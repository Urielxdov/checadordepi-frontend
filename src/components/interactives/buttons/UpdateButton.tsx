import Button from "./Button";

interface UpdateButtonConfig{
    action: () => void
}

function UpdateButton({ action }:UpdateButtonConfig){
    return (
        <Button
            text="actualizar"
            action={action}
            submit={false}
            styles="p-1 text-white bg-green-500 rounded-sm
            hover: bg-green-600 hover: cursor-pointer
            "
        />
    );
}

export default UpdateButton;