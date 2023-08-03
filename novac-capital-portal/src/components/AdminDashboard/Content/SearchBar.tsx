import { useState } from "react";
import Image from "next/image";

type SearchBarProps = {
    onSearch?: (search?: string) => void,
};

function SearchBar(props: SearchBarProps) {
    const [value, setValue] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const search = data.get("search")?.toString().trim();
        console.log("Search for:", search);
        props.onSearch && props.onSearch(search);
    };

    const handleClear = () => {
        setValue("");
        props.onSearch && props.onSearch();
    };

    return (
        <div id="search-bar">
            <Image src="/icons/Search.svg" width="19" height="19" alt="" />
            <form action="" method="get" onChange={() => console.log("Search form changed")} onSubmit={handleSubmit}>
                <input id="search-bar-input" type="text" name="search" placeholder="Buscar" value={value} onChange={event => setValue(event.currentTarget.value)} />
            </form>
            {value && (
                <a id="search-bar-clear-input" onClick={handleClear}>
                    <Image src="/icons/Clear.svg" width="19" height="19" alt="" />
                </a>
            )}
        </div>
    );
}

export default SearchBar;