import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { SignOut } from "../utils/firebase";

import { useAppSelector } from "../app/hooks";
import { selectUser } from "../features/user/userSlice";

function AdminPortal() {
    const navigate = useNavigate();
    const user = useAppSelector(selectUser);

    const handleSignOut = () => {
        SignOut(() => navigate("/"));
    };

    useEffect(() => {
        if (user?.admin)
            console.log("User is admin");
        else {
            console.log("User is not admin");
            navigate("/signin");
        }
    }, [user?.admin]);

    return (
        <>
            <h1>This is the admin portal window</h1>
            <button onClick={() => navigate("/")}>Quotation</button>
            <button onClick={() => navigate("/files")}>Files Checklist</button>
            <button onClick={() => navigate("/home")}>Home</button>
            {user && <button onClick={handleSignOut}>Sign Out</button>}
        </>
    );
}

export default AdminPortal;