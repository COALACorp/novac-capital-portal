import axios from "axios";

const ncApi = axios.create({
    baseURL: "https://2ljokl3jsa.execute-api.us-east-1.amazonaws.com/dev",
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
    console.log("API request create user:", payload);
    const response = await ncApi.post("/user", payload);
    console.log("API response create user:", response.data);

    return response.status === 200 ? response.data ?? null : null;
}

async function CreateApplication(
    userGuid: string,
    advanceFee: number,
    advanceAmount: number,
    loanAmount: number,
    partiality: number,
    initialPayment: number,
    equipment: string,
    cost: number,
    iva: number,
    planId: number
): Promise<APICreationResponse> {
    const payload = {
        userGuid,
        advanceFee,
        advanceAmount,
        loanAmount,
        status: "pending",
        progress: 0,
        partiality,
        initialPayment,
        equipment,
        cost,
        iva,
        planId,
    };
    console.log("API request create application:", payload);
    const response = await ncApi.post("/application", payload);
    console.log("API response create application:", response.data);

    return response.status === 200 ? response.data ?? null : null;
}

async function GetApplication(guid: number): Promise<APIApplication> {
    console.log("API request get application:", guid);
    const response = await ncApi.get("/application/" + guid);
    console.log("API response get application:", response.data);

    return response.status === 200 ? response.data ?? null : null;
}

export { CreateUser, CreateApplication, GetApplication };