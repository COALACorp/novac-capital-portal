import { useEffect } from "react";
import Head from "next/head";
import { ref, child, get } from "firebase/database";
import { onAuthStateChanged, User } from "firebase/auth";

import { database, auth, CheckAdmin } from "@/utils/firebase";
import Quotation from "@/components/Quotation/Quotation";

import { useAppDispatch } from "@/app/hooks";
import { ClientParams, setParams } from "@/features/params/paramsSlice";
import { UserValue, setUser, resetUser } from "@/features/user/userSlice";

export default function QuotationWindow() {
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

    return (
        <>
            <Head>
                <title>Novac Capital</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main>
                <Quotation />
            </main>
        </>
    );
}
