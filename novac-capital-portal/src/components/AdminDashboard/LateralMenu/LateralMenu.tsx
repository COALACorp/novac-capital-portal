import Image from "next/image";
import Box from "@mui/material/Box";

import NavButton from "./NavButton";
import { UserValue } from "@/features/user/userSlice";

type LateralMenuProps = {
    user: UserValue,
    onSignOut?: () => void,
};

function LateralMenu(props: LateralMenuProps) {
    return(
        <Box id="lateral-menu-container">
            <Box id="lateral-menu">
                <Box id="menu-logo">
                    <Image src="/logo.png" width="82" height="83" alt="Logo" />
                </Box>
                <Box id="user-info-container">
                    <Image id="user-info-picture" src="/logo.png" width="55" height="55" alt="Imagen de perfil" />
                    <Box id="user-info">
                        <p id="user-info-name">{props.user.displayName}</p>
                        <p id="user-info-role">{props.user.admin ? "Admin" : "User"}</p>
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
                <NavButton name="Cerrar sesión" icon="/icons/LogOut.svg" onClick={props.onSignOut} />
            </Box>
        </Box>
    );
}

export default LateralMenu;