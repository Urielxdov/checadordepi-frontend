interface CheckBoxProps {
    text: string
    onChange: (check: boolean) => void
}

function CheckBox({text, onChange}:CheckBoxProps){
    return (
        <div>
            {/*checked para obtener el valor booleano*/}
            <input type="checkbox" className="rounded-sm" name="check" onChange={e => onChange(e.target.checked)}/>
            <label htmlFor="check" className="px-1">{text}</label>
        </div>
    );
}

export default CheckBox;