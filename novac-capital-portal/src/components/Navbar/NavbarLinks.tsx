import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";

import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../../features/user/userSlice";

function NavbarLinks() {
    const navigate = useNavigate();
    const user = useAppSelector(selectUser);

    return (
        <Box id="navbar-links">
            <a className="navbar-link strong" href="#" onClick={() => navigate("/")} >Inicio</a>
            {user
                ? (
                    <>
                        <a className="navbar-link" href="#" onClick={() => navigate("/home")}>Test</a>
                        {user.admin && <a className="navbar-link" href="#" onClick={() => navigate("/admin")}>Admin</a>}
                    </>
                ) : <a className="navbar-link" href="#" onClick={() => navigate("/signin")}>Log In</a>
            }
        </Box>
    );
}

export default NavbarLinks;