import Box from "@mui/material/Box";
import Image from "next/image";

function SearchBar() {
    return (
        <Box id="search-bar">
            <Image src="/icons/Search.svg" width="19" height="19" alt="" />
            <form action="" method="get" onChange={() => console.log("Search form changed")} onSubmit={() => console.log("Search form submitted")}>
                <input id="search-bar-input" type="text" name="search" placeholder="Buscar" />
            </form>
        </Box>
    );
}

export default SearchBar;