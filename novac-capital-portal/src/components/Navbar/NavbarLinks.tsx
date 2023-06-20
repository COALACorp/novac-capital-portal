import Box from "@mui/material/Box";

function NavbarLinks() {
    return (
        <Box id="navbar-links">
            <a className="navbar-link strong" href="/">Inicio</a>
            <a className="navbar-link" href="signin">Log In</a>
        </Box>
    );
}

export default NavbarLinks;