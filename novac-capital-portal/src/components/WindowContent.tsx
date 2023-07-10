import { useEffect } from "react";
import Box from "@mui/material/Box";
import { onAuthStateChanged, User } from "firebase/auth";

import { auth, CheckAdmin } from "@/utils/firebase";
import Navbar from "./Navbar/Navbar";

import { useAppDispatch } from "@/app/hooks";
import { UserValue, setUser, resetUser } from "@/features/user/userSlice";

type WindowContentProps = {
    children: React.ReactNode,
};

function WindowContent(props: WindowContentProps) {
    const dispatch = useAppDispatch();

    const setOnAuthStateChange = () => {
        onAuthStateChanged(auth, async user => {
            console.log("User state observer");
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                console.log("User authenticated with UID:", user.uid);

                const authedUser: UserValue = {
                    ...(user.toJSON() as User),
                    admin: false,
                };
                // Check if user is admin
                if (await CheckAdmin()) {
                    authedUser.admin = true;
                    console.log("User is admin");
                }
                dispatch(setUser(authedUser));
            } else {
                // User is signed out
                console.log("User signed out");
                dispatch(resetUser());
            }
        });
    };

    useEffect(() => {
        setOnAuthStateChange()
    }, []);

    return (
        <Box id="app-container">
            <Navbar />
            {props.children}
        </Box>
    );
}

export default WindowContent;