import { useState, useEffect } from "react";
import Image from "next/image";

import NavButton from "./NavButton";
import { UserValue } from "@/features/user/userSlice";

type Filter = "pending"|"approved"|"denied"

type LateralMenuProps = {
    user: UserValue,
    activeFilter?: Filter,
    hidden?: boolean,
    onFilterChange?: (filter: Filter) => void,
    onSignOut?: () => void,
};

function LateralMenu(props: LateralMenuProps) {
    const handleFilterSelection = (filter: Filter) => {
        console.log("Filter", filter);
        props.onFilterChange && props.onFilterChange(filter);
    };

    return props.hidden ? (
            <></>
        ) : (
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
                            <NavButton
                                name="Pendientes"
                                icon="/icons/Pending.svg"
                                active={props.activeFilter === "pending"}
                                onClick={() => handleFilterSelection("pending")}
                            />
                            <NavButton
                                name="Aprobadas"
                                icon="/icons/Approved.svg"
                                active={props.activeFilter === "approved"}
                                onClick={() => handleFilterSelection("approved")}
                            />
                            <NavButton
                                name="Denegadas"
                                icon="/icons/Denied.svg"
                                active={props.activeFilter === "denied"}
                                onClick={() => handleFilterSelection("denied")}
                            />
                        </div>
                    </div>
                </div>
                <div id="user-nav">
                    <NavButton name="Cerrar sesión" icon="/icons/LogOut.svg" onClick={props.onSignOut} />
                </div>
            </div>
        );
}

export default LateralMenu;
export type { Filter };