import type { SelectItem } from "../../interfaces/httpModels";

interface ComboBoxProps {
    name: string
    id: string
    items: Array<SelectItem>
    select?: string
    onChange: (key: string, value: any) => void
}

function ComboBox({ name, id, items, select, onChange }:ComboBoxProps){
    return (
        <select value={select} className="bg-white text-black border border-gray-300 rounded px-2 py-1" name={name} id={id} onChange={e => onChange(e.target.name, e.target.value)}>
            {items.map((i:SelectItem) => (<option key={i.key} value={i.key}>{i.fullName && i.fullName || i.name && i.name}</option>))}
        </select>
    );
}

export default ComboBox;