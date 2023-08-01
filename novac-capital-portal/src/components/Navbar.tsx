import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import { useAppSelector } from "@/app/hooks";
import { selectUser } from "@/features/user/userSlice";

function Navbar() {
    const router = useRouter();
    const user = useAppSelector(selectUser);

    return (
        <div id="navbar">
            <Image
                id="navbar-logo"
                src="/logo.png"
                alt="novac capital logo"
                width={82}
                height={83}
                onClick={() => router.push("/")}
            />
            <div id="navbar-links">
                <Link className="navbar-link strong" href="/">Inicio</Link>
                {user ? (
                        <>
                            {/* <Link className="navbar-link" href="/home">Test</Link> */}
                            {/* {user.admin && <Link className="navbar-link" href="/admin_portal">Admin</Link>} */}
                            <Link className="navbar-link" href="/files_form">Mi Cuenta</Link>
                        </>
                    ) : <Link className="navbar-link" href="/signin">Log In</Link>
                }
            </div>
        </div>
    );
}

export default Navbar;