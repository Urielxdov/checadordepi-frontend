import type { SelectItem } from "../../interfaces/httpConfig";

interface ComboBoxProps {
    name: string
    id: string
    items: Array<SelectItem>
    select: string
    onChange: (key: string, value: any) => void
}

function ComboBox({ name, id, items, select = "default", onChange }:ComboBoxProps){
    return (
        <select className="bg-white text-black border border-gray-300 rounded px-2 py-1" name={name} id={id} onChange={e => onChange(e.target.name, e.target.value)}>
            {items.map((i:SelectItem) => {
                if(select==i.key){
                    return <option key={i.key} value={i.key} selected>{i.fullName && i.fullName || i.name && i.name}</option>
                }else{
                    return <option key={i.key} value={i.key}>{i.fullName && i.fullName || i.name && i.name}</option>
                }
            })}
        </select>
    );
}

export default ComboBox;