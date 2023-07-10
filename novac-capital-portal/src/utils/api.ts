import axios from "axios";

const ncApi = axios.create({
    baseURL: "https://2ljokl3jsa.execute-api.us-east-1.amazonaws.com/dev",
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    },
});

type APIUserCreateData = {
    userId: number,
};

type APIUserData = {
    id: number,
    guid: string,
    name: string,
    email: string,
};

type APIApplicationCreateData = {
    applicationId: number,
};

type APIApplicationData = {
    id: number,
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
};

type APIUserApplicationsData = {
    user: APIUserData,
    applications: APIApplicationData[],
}

type APIResponse<T> = null|{
    statusCode: number,
    data: T,
    message: string,
};

async function CreateUser(guid: string, name: string, email: string): Promise<APIResponse<APIUserCreateData>> {
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

async function GetUser(guid: string): Promise<APIResponse<APIUserData>> {
    try {
        console.log("API request get user:", guid);
        const response = await ncApi.get("/user/" + guid);
        console.log("API response get user:", response.data);

        return response.status === 200 ? response.data ?? null : null;
    } catch (error) {
        console.log("Error while getting user:", error);
    }
    return null;
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
): Promise<APIResponse<APIApplicationCreateData>> {
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

async function GetApplication(guid: string, applicationId: number): Promise<APIResponse<APIUserApplicationsData>|null> {
    console.log("API request get application:", guid);
    const response: APIResponse<APIUserApplicationsData> = (await ncApi.get("/application/" + guid)).data;
    const application = response?.data.applications.find(application => application.id === applicationId);
    let result = null;
    if (response && application) {
        response.data.applications = [ application ];
        result = response;
    }
    console.log("API response get application:", result);

    return result;
}

export { CreateUser, GetUser, CreateApplication, GetApplication };
export type { APIUserApplicationsData };