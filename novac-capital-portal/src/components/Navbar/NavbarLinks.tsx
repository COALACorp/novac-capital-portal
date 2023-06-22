import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";

function NavbarLinks() {
    const navigate = useNavigate();

    return (
        <Box id="navbar-links">
            <a className="navbar-link strong" href="#" onClick={() => navigate("/")} >Inicio</a>
            <a className="navbar-link" href="#" onClick={() => navigate("/signin")}>Log In</a>
        </Box>
    );
}

export default NavbarLinks;