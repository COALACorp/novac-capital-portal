import "@/styles/dashboard.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import LateralMenu from "./LateralMenu/LateralMenu";
import Content from "./Content/Content";
import { SignOut } from "@/utils/firebase";

import { useAppSelector } from "@/app/hooks";
import { selectUser } from "@/features/user/userSlice";

function AdminDashboard() {
    const router = useRouter();
    const user = useAppSelector(selectUser);
    const [menuHidden, setMenuHidden] = useState(false);

    const handleLateralMenu = () => {
        console.log("Handle lateral");
        setMenuHidden(!menuHidden);
    }

    const handleSignOut = () => {
        SignOut(() => router.push("/"));
    };

    useEffect(() => {
        if (user?.admin)
            console.log("User is admin");
        else {
            console.log("User is not admin");
            router.push("/signin");
        }
    }, [user?.admin]);

    return user && (
        <div id="dashboard-container">
            <LateralMenu user={user} onSignOut={handleSignOut} hidden={menuHidden} />
            <Content onLateralMenu={handleLateralMenu} onSignOut={handleSignOut} />
        </div>
    );
}

export default AdminDashboard;