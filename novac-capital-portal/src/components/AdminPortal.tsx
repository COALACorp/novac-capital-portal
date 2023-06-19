import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

import { auth } from "../utils/firebase";

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

    return (
        <>
            <h1>This is the admin portal window</h1>
            <button onClick={() => navigate("/")}>Home</button>
            <button onClick={() => navigate("/portal")}>Portal</button>
            <button onClick={() => navigate("/quotation")}>Quotation</button>
            {auth.currentUser && <button onClick={handleSignOut}>Sign Out</button>}
        </>
    );
}

export default AdminPortal;