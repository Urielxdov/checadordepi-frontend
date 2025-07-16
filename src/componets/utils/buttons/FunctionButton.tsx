import Button from "./Button";

//parametros de funcion button
interface FunctionButtonProps{
    type: "DELETE" | "UPDATE",
    action: (e: React.MouseEvent<HTMLButtonElement>) => void
}

//componente de boton para function table
function FunctionButton({ type, action }:FunctionButtonProps){
    //boton de eliminado
    if(type=='DELETE'){
        return(
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

    //boton de actualizado
    if(type=='UPDATE'){
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
}

export default FunctionButton;