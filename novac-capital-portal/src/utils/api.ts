import axios from "axios";

const medichat = axios.create({
    baseURL: "https://fqt682j9dj.execute-api.us-east-1.amazonaws.com/dev",
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    },
});

type APICreationResponse = {
    statusCode: number,
    data: {
        userId: number
    },
    message: string,
};

type APIApplication = {
    statusCode: number,
    data: {
        user: {
            guid: string,
            name: string,
            email: string
        },
        application: {
            userId: number,
            advanceFee: number,
            advanceAmount: number,
            loanAmount: number,
            status: string,
            progress: number,
            partiality: number,
            initialPayment: number,
            equipment: string,
            cost: number,
            iva: number,
            planId: number,
            plan: {
                dues: number,
                administrative: number,
                initialCustomerExpenses: number,
                signaturesRatification: number,
                folioVerification: number,
                openingCommission: number,
                iva: number,
                creditBureau: number,
                margin: number,
            },
        },
    },
    message: string,
};

async function CreateUser(guid: string, name: string, email: string): Promise<APICreationResponse> {
    const payload = {
        guid,
        name,
        email,
    };
    const response = await medichat.post("/user", payload);
    console.log("API response:", response.data);

    return response.status === 200 ? response.data ?? null : null;
}

async function CreateApplication(
    userId: number,
    advanceFee: number,
    advanceAmount: number,
    loanAmount: number,
    status: string,
    progress: number,
    partiality: number,
    initialPayment: number,
    equipment: string,
    cost: number,
    iva: number
): Promise<APICreationResponse> {
    const payload = {
        userId,
        advanceFee,
        advanceAmount,
        loanAmount,
        status,
        progress,
        partiality,
        initialPayment,
        equipment,
        cost,
        iva,
    };
    const response = await medichat.post("/application", payload);
    console.log("API response:", response.data);

    return response.status === 200 ? response.data ?? null : null;
}

async function GetApplication(applicationId: number): Promise<APIApplication> {
    const response = await medichat.get("/application/" + applicationId);
    console.log("API response:", response.data);

    return response.status === 200 ? response.data ?? null : null;
}

export { CreateUser, CreateApplication };