import "@/styles/dashboard.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";

import LateralMenu from "./LateralMenu/LateralMenu";
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

    return (
        <Box id="dashboard-container">
            <LateralMenu />
            <h1>This is the admin portal window</h1>
            <button onClick={() => router.push("/")}>Quotation</button>
            <button onClick={() => router.push("/files_form")}>Files Checklist</button>
            <button onClick={() => router.push("/home")}>Home</button>
            {user && <button onClick={handleSignOut}>Sign Out</button>}
        </Box>
    );
}

export default AdminDashboard;