import { useEffect } from "react";
import Head from "next/head";
import { ref, child, get } from "firebase/database";

import WindowContent from "@/components/WindowContent";
import { database } from "@/utils/firebase";
import Quotation from "@/components/Quotation/Quotation";

import { useAppDispatch } from "@/app/hooks";
import { ClientParams, setParams } from "@/features/params/paramsSlice";

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

    useEffect(() => {
        getClientConfig();
    }, []);

    return (
        <WindowContent>
            <Head>
                <title>Novac Capital</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main>
                <Quotation />
            </main>
        </WindowContent>
    );
}
