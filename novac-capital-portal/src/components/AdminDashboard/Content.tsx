import Box from "@mui/material/Box";
import Image from "next/image";

import SearchBar from "./SearchBar";
import ContentTable from "./ContentTable/ContentTable";
import ContentRow from "./ContentTable/ContentRow";

function Content() {
    return (
        <Box id="content-container">
            <Box id="content-nav">
                <Box id="content-nav-menu" component="a" onClick={() => console.log("Hamburguer")}>
                    <Image src="/icons/HamburguerMenu.svg" width="26" height="17" alt="Menu" />
                </Box>
                <Box id="content-nav-profile" component="a" onClick={() => console.log("Content profile")}>
                    <Box id="content-nav-profile-info">
                        <Image id="content-nav-profile-picture" src="/logo.png" width="38" height="38" alt="Imagen de perfil" />
                        <p className="strong">James Smith</p>
                    </Box>
                    <Image src="/icons/ArrowDown.svg" width="14" height="7" alt="" />
                </Box>
            </Box>
            <Box id="content-header">
                <p id="content-header-title" className="strong">Dashboard</p>
                <SearchBar />
            </Box>
            <ContentTable>
                <ContentRow
                    months={18}
                    name="Ana Garcia"
                    picture="/logo.png"
                    phone="(55) 62-37-30-86"
                    progress={75}
                    amount={99999999.99}
                    date="7/14/2023"
                />
                <ContentRow
                    months={24}
                    name="Carlos Gonzalez"
                    phone="(55) 62-37-30-86"
                    progress={50}
                    amount={99999999.99}
                    date="7/14/2023"
                />
            </ContentTable>
        </Box>
    );
}

export default Content;