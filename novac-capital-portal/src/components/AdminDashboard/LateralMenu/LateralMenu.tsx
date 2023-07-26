import Image from "next/image";
import Box from "@mui/material/Box";

import NavButton from "./NavButton";

function LateralMenu() {
    return(
        <Box id="lateral-menu-container">
            <Box id="lateral-menu">
                <Box id="menu-logo">
                    <Image src="/logo.png" width="82" height="83" alt="Logo" />
                </Box>
                <Box id="user-info-container">
                    <Image id="user-info-picture" src="/logo.png" width="55" height="55" alt="Imagen de perfil" />
                    <Box id="user-info">
                        <p id="user-info-name">James Smith</p>
                        <p id="user-info-role">Admin</p>
                    </Box>
                </Box>
                <Box id="nav-container">
                    <Box id="apps-nav">
                        <Box id="apps-nav-title">
                            <p>Aplicaciones</p>
                        </Box>
                        <NavButton name="Pendientes" icon="/icons/Pending.svg" />
                        <NavButton name="Aprobadas" icon="/icons/Approved.svg" />
                        <NavButton name="Denegadas" icon="/icons/Denied.svg" />
                    </Box>
                </Box>
            </Box>
            <Box id="user-nav">
                <NavButton name="Cerrar sesión" icon="/icons/LogOut.svg" />
            </Box>
        </Box>
    );
}

export default LateralMenu;