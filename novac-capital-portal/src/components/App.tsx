import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ref, child, get } from "firebase/database";
import { onAuthStateChanged, User } from "firebase/auth";

import { database, auth, CheckAdmin } from "../utils/firebase";
import WindowContent from "./WindowContent";
import Quotation from "./Quotation/Quotation";
import Home from "./Home";
import SignIn from "./Authentication/SignIn";
import SignUp from "./Authentication/SignUp";
import PasswordReset from "./Authentication/PasswordReset";
import FilesForm from "./FilesForm/FilesForm";
import AdminPortal from "./AdminPortal";

import { useAppDispatch } from "../app/hooks";
import { ClientParams, setParams } from "../features/params/paramsSlice";
import { UserValue, setUser, resetUser } from "../features/user/userSlice";

import "../styles/app.css";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <WindowContent>
                <Quotation />
            </WindowContent>
        ),
    },
    {
        path: "/home",
        element: (
            <WindowContent>
                <Home />
            </WindowContent>
        ),
    },
    {
        path: "/signin",
        element: (
            <WindowContent>
                <SignIn />
            </WindowContent>
        ),
    },
    {
        path: "/signup",
        element: (
            <WindowContent>
                <SignUp />
            </WindowContent>
        ),
    },
    {
        path: "/reset",
        element: (
            <WindowContent>
                <PasswordReset />
            </WindowContent>
        ),
    },
    {
        path: "/files",
        element: (
            <WindowContent>
                <FilesForm />
            </WindowContent>
        ),
    },
    {
        path: "/admin",
        element: (
            <WindowContent>
                <AdminPortal />
            </WindowContent>
        ),
    },
]);

function App() {
    const dispatch = useAppDispatch();

    const getClientConfig = () => {
        console.log("Get client params");
        const dbRef = ref(database);
        get(child(dbRef, "clientConfig"))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const params = snapshot.val() as ClientParams;
                    console.log("Client params:", params);
                    dispatch(setParams(params));
                } else {
                    console.log("No client params available");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const setOnAuthStateChange = () => {
        onAuthStateChanged(auth, async user => {
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
        getClientConfig();
        setOnAuthStateChange();
    }, []);

    return <RouterProvider router={router} />;
}

export default App;
