import { useState } from "react";
import Button from "../buttons/Button";

type SearchBarConfig = {
    tip: string,
    onSearch: (s:string) => any,
}

function SearchBar({ tip, onSearch}:SearchBarConfig){
    //estado de busqueda
    const [search, setSearch] = useState('');

    //funcion a ajecutar para buscar
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //paso la busqueda al padre
        onSearch(search);
        setSearch('');
    }

    return (
        <form className="flex flex-row rounded-sm min-w-100 mx-auto" onSubmit={handleSearch}>
            <span className="font-bold">Buscar:</span>
            <input className="grow mx-2 border-2 border-gray-300" type="text" name="search" id="search" maxLength={8} required placeholder={tip} value={search} onChange={(e) => setSearch(e.target.value)}/>
            <Button
                text="buscar"
                action={()=>{}}
                submit={true}
                styles="p-1 text-white bg-blue-500 rounded-sm"
            />
        </form>
    );
}

export default SearchBar;