import { useNavigate } from "react-router-dom";

import { SignOut } from "../utils/firebase";

import { useAppSelector } from "../app/hooks";
import { selectUser } from "../features/user/userSlice";

function Home() {
    const navigate = useNavigate();
    const user = useAppSelector(selectUser);

    const handleSignOut = () => {
        SignOut(() => navigate("/"));
    };

    return (
        <>
            <h1>This is the home page</h1>
            <button onClick={() => navigate("/")}>Quotation</button>
            <button onClick={() => navigate("/portal")}>Portal</button>
            <button onClick={() => navigate("/admin")}>Admin</button>
            {user
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