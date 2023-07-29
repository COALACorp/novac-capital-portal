import { useState, useEffect } from "react";
import Image from "next/image";

import NavButton from "./NavButton";
import { UserValue } from "@/features/user/userSlice";

type LateralMenuProps = {
    user: UserValue,
    hidden?: boolean,
    onSignOut?: () => void,
};

function LateralMenu(props: LateralMenuProps) {
    const [content, setContent] = useState(<></>);

    useEffect(() => {
        if (!props.hidden)
            setContent(
                <div id="lateral-menu-container" className={props.hidden ? "hidden" : ""}>
                    <div id="lateral-menu">
                        <div id="menu-logo">
                            <Image src="/logo.png" width="82" height="83" alt="Logo" />
                        </div>
                        <div id="user-info-container">
                            <Image id="user-info-picture" src="/profile.png" width="55" height="55" alt="Imagen de perfil" />
                            <div id="user-info">
                                <p id="user-info-name">NovacCapital</p>
                                <p id="user-info-role">{props.user.admin ? "Admin" : "User"}</p>
                            </div>
                        </div>
                        <div id="nav-container">
                            <div id="apps-nav">
                                <div id="apps-nav-title">
                                    <p>Aplicaciones</p>
                                </div>
                                <NavButton name="Pendientes" icon="/icons/Pending.svg" />
                                <NavButton name="Aprobadas" icon="/icons/Approved.svg" />
                                <NavButton name="Denegadas" icon="/icons/Denied.svg" />
                            </div>
                        </div>
                    </div>
                    <div id="user-nav">
                        <NavButton name="Cerrar sesión" icon="/icons/LogOut.svg" onClick={props.onSignOut} />
                    </div>
                </div>
            );
        else
            setContent(<></>);
    }, [props.hidden]);

    return content;
}

export default LateralMenu;