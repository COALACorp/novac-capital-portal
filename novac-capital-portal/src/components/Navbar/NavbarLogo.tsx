import { useRouter } from "next/router";
import Image from "next/image";

function NavbarLogo() {
    const router = useRouter();

    return (
        <Image
            id="navbar-logo"
            src="/logo.png"
            alt="novac capital logo"
            width={82}
            height={83}
            onClick={() => router.push("/")}
        />
    );
}

export default NavbarLogo;