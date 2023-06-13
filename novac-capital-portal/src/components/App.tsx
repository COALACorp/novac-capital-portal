import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth";
import Box from "@mui/material/Box";

import { auth } from "../utils/firebase";
import Home from "./Home";
import SignIn from "./Authentication/SignIn";
import SignUp from "./Authentication/SignUp";
import PasswordReset from "./Authentication/PasswordReset";
import Portal from "./Portal";
import Quotation from "./Quotation/Quotation";

import "../styles/app.css";

const router = createBrowserRouter([
    {
        path: "/",
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
        path: "/quotation",
        element: <Quotation />,
    },
]);

function App() {
    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                console.log("User authenticated with UID:", uid);
            } else {
                // User is signed out
                console.log("User signed out");
            }
        });
    }, []);

    return (
        <Box id="app-container">
            <RouterProvider router={router} />
        </Box>
    );
}

export default App;
