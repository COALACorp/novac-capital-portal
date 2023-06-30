import Link from "next/link";
import Box from "@mui/material/Box";

import { useAppSelector } from "@/app/hooks";
import { selectUser } from "@/features/user/userSlice";

function NavbarLinks() {
    const user = useAppSelector(selectUser);

    return (
        <Box id="navbar-links">
            <Link className="navbar-link strong" href="/">Inicio</Link>
            {user
                ? (
                    <>
                        <Link className="navbar-link" href="/home">Test</Link>
                        {user.admin && <Link className="navbar-link" href="/admin_portal">Admin</Link>}
                    </>
                ) : <Link className="navbar-link" href="/signin">Log In</Link>
            }
        </Box>
    );
}

export default NavbarLinks;