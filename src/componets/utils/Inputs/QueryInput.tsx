import debounce from "../../../utils/Debounce"

interface PropsQueryInput {
    action: (query:string) => void | ((query: number) => void),
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
        <input className="flex w-full border rounded-sm border-gray-500 p-1.5 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500" type="text" placeholder={placeholder} onChange={sendQuery}/>
    )
} 