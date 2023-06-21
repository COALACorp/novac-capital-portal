import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

import { auth } from "../utils/auth";

function Home() {
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
            <h1>This is the home page</h1>
            <button onClick={console.log}>Update</button>
            <button onClick={() => navigate("/")}>Quotation</button>
            <button onClick={() => navigate("/portal")}>Portal</button>
            <button onClick={() => navigate("/admin")}>Admin</button>
            {auth.currentUser
                ? <button onClick={handleSignOut}>Sign Out</button>
                : (
                    <>
                        <button onClick={() => navigate("/signin")}>Sign In</button>
                        <button onClick={() => navigate("/signup")}>Sign Up</button>
                    </>
                )
            }
        </>
    );
}

export default Home;