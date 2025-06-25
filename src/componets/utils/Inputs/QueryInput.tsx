import debounce from "../../../utils/Debounce"

interface PropsQueryInput {
    action: (query:string) => void,
    placeholder: string
}

export default function QueryInput({action, placeholder}: PropsQueryInput){

    const sendQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value.length < 3) return

        // Debounce para evitar que se llame a la acción demasiadas veces
        debounce(() => {
            action(e.target.value)
        }, 500)(); 
    }

    return (
        <input type="text" placeholder={placeholder} onChange={sendQuery}/>
    )
} 