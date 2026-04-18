import Button from "../interactives/buttons/Button";

interface PageBarProps{
    current: number
    total: number
    onChange: (page: number) => Promise<void> | void
}

function PageBar({current, total, onChange}:PageBarProps){
    return (
        <div className="w-full flex flex-row justify-between">
            {current>0?<Button
                text="prev."
                action={() => onChange(current-1)}
                submit={false}
                styles='px-4 py-2 rounded bg-blue-500 text-white
      hover:bg-blue-600 hover:cursor-pointer'
            />:<p>sin previo</p>}
            {current<(total-1)?<Button
                text="sig."
                action={() => onChange(current+1)}
                submit={false}
                styles='px-4 py-2 rounded bg-blue-500 text-white
      hover:bg-blue-600 hover:cursor-pointer'
            />:<p>sin siguiente</p>}
        </div>
    );
}

export default PageBar;