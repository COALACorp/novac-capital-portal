import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import { useAppSelector } from "@/app/hooks";
import { selectUser } from "@/features/user/userSlice";
import { SignOut } from "@/utils/firebase";

function Navbar() {
    const router = useRouter();
    const user = useAppSelector(selectUser);

    const handleSignOut = () => {
        SignOut(() => router.push("/"));
    };

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
                    user.admin ? (
                        <Link className="navbar-link" href="/admin_portal">Dashboard</Link>
                    ) : (
                        <>
                            <Link className="navbar-link" href="/files_form">Mi Cuenta</Link>
                            <a className="navbar-link" onClick={handleSignOut}>Cerrar Sesión</a>
                        </>
                    )
                ) : (
                    <Link className="navbar-link" href="/signin">Iniciar Sesión</Link>
                )}
            </div>
        </div>
    );
}

export default Navbar;