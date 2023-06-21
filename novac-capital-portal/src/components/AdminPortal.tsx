import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

import { auth, CheckAdmin } from "../utils/auth";

function AdminPortal() {
    const navigate = useNavigate();

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                // Sign Out successfully
                navigate("/");
                console.log("Signed out successfully");
            })
            .catch(error => {
                console.log("Error on sign out:", error);
            });
    };

    useEffect(() => {
        const CheckPermission = async () => {
            if (await CheckAdmin(auth))
            console.log("User is admin");
            else {
                console.log("User is not admin");
                navigate("/signin");
            }
        };
        
        CheckPermission();
    }, []);

    return (
        <>
            <h1>This is the admin portal window</h1>
            <button onClick={() => navigate("/")}>Quotation</button>
            <button onClick={() => navigate("/home")}>Home</button>
            <button onClick={() => navigate("/portal")}>Portal</button>
            {auth.currentUser && <button onClick={handleSignOut}>Sign Out</button>}
        </>
    );
}

export default AdminPortal;