import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ref, child, get } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import Box from "@mui/material/Box";

import { database, auth, CheckAdmin } from "../utils/firebase";
import Navbar from "./Navbar/Navbar";
import Quotation from "./Quotation/Quotation";
import Home from "./Home";
import SignIn from "./Authentication/SignIn";
import SignUp from "./Authentication/SignUp";
import PasswordReset from "./Authentication/PasswordReset";
import Portal from "./Portal";
import FilesForm from "./FilesForm/FilesForm";
import AdminPortal from "./AdminPortal";

import { useAppDispatch } from "../app/hooks";
import { ClientParams, setParams } from "../features/params/paramsSlice";

import "../styles/app.css";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Quotation />,
    },
    {
        path: "/home",
        element: <Home />,
    },
    {
        path: "/signin",
        element: <SignIn />,
    },
    {
        path: "/signup",
        element: <SignUp />,
    },
    {
        path: "/reset",
        element: <PasswordReset />,
    },
    {
        path: "/portal",
        element: <Portal />,
    },
    {
        path: "/files",
        element: <FilesForm />,
    },
    {
        path: "/admin",
        element: <AdminPortal />,
    },
]);

function App() {
    const dispatch = useAppDispatch();

    const getClientConfig = () => {
        console.log("Get client config");
        const dbRef = ref(database);
        get(child(dbRef, "clientConfig"))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const params = snapshot.val() as ClientParams;
                    console.log("Client config:", params);
                    dispatch(setParams(params));
                } else {
                    console.log("No data available");
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
                const uid = user.uid;

                // Check if user is admin
                if (await CheckAdmin(auth))
                    console.log("User is admin");
                
                console.log("User authenticated with UID:", uid);
            } else {
                // User is signed out
                console.log("User signed out");
            }
        });
    };

    useEffect(() => {
        getClientConfig();
        setOnAuthStateChange();
    }, []);

    return (
        <Box id="app-container">
            <Navbar />
            <RouterProvider router={router} />
        </Box>
    );
}

export default App;
