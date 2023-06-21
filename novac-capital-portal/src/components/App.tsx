import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth";
import Box from "@mui/material/Box";

import { auth, CheckAdmin } from "../utils/auth";
import Navbar from "./Navbar/Navbar";
import Quotation from "./Quotation/Quotation";
import Home from "./Home";
import SignIn from "./Authentication/SignIn";
import SignUp from "./Authentication/SignUp";
import PasswordReset from "./Authentication/PasswordReset";
import Portal from "./Portal";
import FilesForm from "./FilesForm/FilesForm";
import AdminPortal from "./AdminPortal";

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
    useEffect(() => {
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
    }, []);

    return (
        <Box id="app-container">
            <Navbar />
            <RouterProvider router={router} />
        </Box>
    );
}

export default App;
