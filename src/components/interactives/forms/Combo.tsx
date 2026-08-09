import type { SelectItem } from "../../../interfaces/httpModels";

interface ComboBoxProps {
    name: string
    id: string
    items: Array<SelectItem>
    select?: string
    error?: string
    onChange: (key: string, value: any) => void
}

function ComboBox({ name, id, items, select, error, onChange }:ComboBoxProps){
    const hasError = Boolean(error);

    return (
        <div className="flex flex-col gap-2 text-left">
            <select
                value={select}
                className={`bg-white text-black border rounded px-2 py-1 focus:outline-none focus:ring-2 ${hasError ? 'border-red-600 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
                name={name}
                id={id}
                onChange={e => onChange(e.target.name, e.target.value)}
                aria-invalid={hasError}
                aria-describedby={hasError ? `${id}-error` : undefined}
            >
                {items.map((i:SelectItem) => (<option key={i.key} value={i.key}>{i.fullName && i.fullName || i.name && i.name}</option>))}
            </select>
            {error && (
                <p id={`${id}-error`} className="text-sm text-red-600">
                    {error}
                </p>
            )}
        </div>
    );
}

export default ComboBox;
