import Image from "next/image";

type SearchBarProps = {
    onSearch?: (search?: string) => void,
};

function SearchBar(props: SearchBarProps) {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const search = data.get("search")?.toString().trim();
        console.log("Search for:", search);
        props.onSearch && props.onSearch(search);
    };

    return (
        <div id="search-bar">
            <Image src="/icons/Search.svg" width="19" height="19" alt="" />
            <form action="" method="get" onChange={() => console.log("Search form changed")} onSubmit={handleSubmit}>
                <input id="search-bar-input" type="text" name="search" placeholder="Buscar" />
            </form>
        </div>
    );
}

export default SearchBar;