import Box from "@mui/material/Box";

import NavbarLogo from "./NavbarLogo";
import NavbarLinks from "./NavbarLinks";

function Navbar() {
    return (
        <Box id="navbar">
            <NavbarLogo />
            <NavbarLinks />
        </Box>
    );
}

export default Navbar;