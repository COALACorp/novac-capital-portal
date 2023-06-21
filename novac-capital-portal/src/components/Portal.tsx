import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

import { auth } from "../utils/auth";

function Portal() {
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
            <h1>This is the content window</h1>
            <button onClick={() => navigate("/")}>Quotation</button>
            <button onClick={() => navigate("/home")}>Home</button>
            <button onClick={() => navigate("/admin")}>Admin</button>
            {auth.currentUser && <button onClick={handleSignOut}>Sign Out</button>}
        </>
    );
}

export default Portal;