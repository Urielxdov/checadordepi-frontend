import { useState } from "react";
import Button from "../buttons/Button";

type SearchBarConfig = {
    tip: string,
    onSearch: (s:any) => any,
    onResult: (r:any) => void
}

function SearchBar({ tip, onSearch, onResult}:SearchBarConfig){
    //estado de busqueda
    const [search, setSearch] = useState('');

    //funcion a ajecutar para buscar
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const result = onSearch(search);
        if(result){
            onResult(result);
        }
    }

    return (
        <form className="flex flex-row rounded-sm max-w-200 mx-auto" onSubmit={handleSearch}>
            <span className="font-bold">Buscar:</span>
            <input className="grow mx-2 border-2 border-gray-300" type="text" name="search" id="search" maxLength={8} required placeholder={tip} onChange={(e) => setSearch(e.target.value)}/>
            <Button
                text="buscar"
                action={()=>{}}
                submit={true}
            />
        </form>
    );
}

export default SearchBar;