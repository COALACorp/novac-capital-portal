import { useRouter } from "next/router";

import { SignOut } from "@/utils/firebase";

import { useAppSelector } from "@/app/hooks";
import { selectUser } from "@/features/user/userSlice";

function Home() {
    const router = useRouter();
    const user = useAppSelector(selectUser);

    const handleSignOut = () => {
        SignOut(() => router.push("/"));
    };

    return (
        <>
            <h1>This is the home page</h1>
            <button onClick={() => router.push("/")}>Quotation</button>
            <button onClick={() => router.push("/files_form")}>Files Checklist</button>
            {user
                ? <button onClick={handleSignOut}>Sign Out</button>
                : (
                    <>
                        <button onClick={() => router.push("/signin")}>Sign In</button>
                        <button onClick={() => router.push("/signup")}>Sign Up</button>
                    </>
                )
            }
        </>
    );
}

export default Home;