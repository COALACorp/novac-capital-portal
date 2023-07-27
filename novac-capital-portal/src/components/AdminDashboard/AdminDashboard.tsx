import "@/styles/dashboard.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";

import LateralMenu from "./LateralMenu/LateralMenu";
import Content from "./Content";
import { SignOut } from "@/utils/firebase";

import { useAppSelector } from "@/app/hooks";
import { selectUser } from "@/features/user/userSlice";

function AdminDashboard() {
    const router = useRouter();
    const user = useAppSelector(selectUser);

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
        <Box id="dashboard-container">
            <LateralMenu user={user} onSignOut={handleSignOut} />
            <Content />
        </Box>
    );
}

export default AdminDashboard;