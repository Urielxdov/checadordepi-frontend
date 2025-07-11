interface ComboBoxProps {
    name: string
    id: string
    items: Array<string>
}

function ComboBox({ name, id, items }:ComboBoxProps){
    return (
        <select name={name} id={id}>
            {items.map(i => <option value={i}>{i}</option>)}
        </select>
    );
}

export default ComboBox;