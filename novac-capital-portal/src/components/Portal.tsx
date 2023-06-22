import { useNavigate } from "react-router-dom";

import { SignOut } from "../utils/firebase";

import { useAppSelector } from "../app/hooks";
import { selectUser } from "../features/user/userSlice";

function Portal() {
    const navigate = useNavigate();
    const user = useAppSelector(selectUser);

    const handleSignOut = () => {
        SignOut(() => navigate("/"));
    };

    return (
        <>
            <h1>This is the content window</h1>
            <button onClick={() => navigate("/")}>Quotation</button>
            <button onClick={() => navigate("/home")}>Home</button>
            <button onClick={() => navigate("/admin")}>Admin</button>
            {user && <button onClick={handleSignOut}>Sign Out</button>}
        </>
    );
}

export default Portal;