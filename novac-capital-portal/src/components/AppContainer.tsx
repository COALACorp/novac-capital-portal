import { useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";

import { auth, CheckAdmin } from "@/utils/firebase";
import { InitAPI, GetUser } from "@/utils/api";
import { InitDocsAPI } from "@/utils/docsApi";

import { useAppDispatch } from "@/app/hooks";
import { UserValue, setUser, resetUser } from "@/features/user/userSlice";

type PageContainerProps = {
    children: React.ReactNode,
};

function AppContainer(props: PageContainerProps) {
    const dispatch = useAppDispatch();

    const setOnAuthStateChange = () => {
        onAuthStateChanged(auth, async user => {
            // console.log("User state observer");
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                // console.log("User authenticated with UID:", user.uid);

                const idToken = await user.getIdTokenResult();
                // console.log("User ID token:", idToken.token, idToken.expirationTime);

                // Initialize API
                InitAPI(idToken.token);
                InitDocsAPI(idToken.token);

                const authedUser: UserValue = {
                    ...(user.toJSON() as User),
                    registered: false,
                    admin: false,
                    token: idToken.token,
                };
                // Check if user is registered
                if (await GetUser(user.uid)) {
                    authedUser.registered = true;
                    // console.log("User is registered");
                }
                // Check if user is admin
                if (await CheckAdmin()) {
                    authedUser.admin = true;
                    // console.log("User is admin");
                }
                dispatch(setUser(authedUser));
            } else {
                // User is signed out
                // console.log("User signed out");
                dispatch(resetUser());
            }
        });
    };

    useEffect(() => {
        setOnAuthStateChange()
    }, []);

    return (
        <div id="page-container">
            {props.children}
        </div>
    );
}

export default AppContainer;