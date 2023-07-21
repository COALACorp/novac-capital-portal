import axios from "axios";
import { Status } from "@/components/FilesForm/FileInput/FileInputAction/FileInputAction";

const api = axios.create({
    baseURL: "https://teqzfxt83a.execute-api.us-east-1.amazonaws.com/dev",
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
    email: string,
    phone: string,
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
    name: string,
};

type APIUserApplicationsData = {
    user: APIUserData,
    applications: APIApplicationData[],
}

type APIUserApplicationDocs = {
    id: number,
    applicationId: number,
    name: string,
    path: string,
    status: Status,
};

type ApplicationData = {
    application: APIApplicationData,
    documents: APIUserApplicationDocs[],
};

type APIResponse<T> = null|{
    statusCode: number,
    data: T,
    message: string,
};

export async function CreateUser(guid: string, email: string, phone: string): Promise<APIResponse<APIUserCreateData>> {
    try {
        const payload = {
            guid,
            email,
            phone,
        };
        console.log("API request create user:", payload);
        const response = await api.post("/user", payload);
        console.log("API response create user:", response.data);
    
        return response.status === 200 ? response.data ?? null : null;   
    } catch (error) {
        console.log("Error while creating user:", error);
    }
    return null;
}

export async function GetUser(guid: string): Promise<APIResponse<APIUserData>> {
    try {
        console.log("API request get user:", guid);
        const response = await api.get("/user/" + guid);
        console.log("API response get user:", response.data);

        return response.status === 200 ? response.data ?? null : null;
    } catch (error) {
        console.log("Error while getting user:", error);
    }
    return null;
}

export async function CreateApplication(
    userGuid: string,
    name: string,
    advanceFee: number,
    advanceAmount: number,
    loanAmount: number,
    partiality: number,
    initialPayment: number,
    equipment: string,
    cost: number,
    iva: number,
    planId: number
): Promise<APIResponse<APIApplicationCreateData>|null> {
    const payload = {
        userGuid,
        name,
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
    const response = await api.post<APIResponse<APIApplicationCreateData>>("/application", payload);
    console.log("API response create application:", response.data);

    return response.status === 200 ? response.data ?? null : null;
}

export async function GetApplicationDocs(guid: string, applicationId: number): Promise<APIResponse<APIUserApplicationDocs[]>|null> {
    console.log("API request get documents:", guid);
    const response = await api.get<APIResponse<APIUserApplicationDocs[]>>(`/document/${guid}/${applicationId}`);
    console.log("API response get documents:", response.data);

    return response.status === 200 ? response.data ?? null : null;
}

export async function GetLastApplication(guid: string): Promise<APIResponse<ApplicationData>|null> {
    console.log("API request get application:", guid);
    const response = await api.get<APIResponse<APIUserApplicationsData>>("/application/" + guid);
    console.log("API response get application:", response.data);

    let result: APIResponse<ApplicationData>|null = null;
    if (response.status === 200 && response.data) {
        const data = response.data;
        const latest = data.data.applications.find(application => application.id === Math.max(...data.data.applications.map(application => application.id)));
        if (latest) {
            result = {
                statusCode: data.statusCode,
                data: {
                    application: latest,
                    documents: [],
                },
                message: data.message,
            }
            const docs = await GetApplicationDocs(guid, latest.id);
            if (docs) {
                result = {
                    statusCode: docs.statusCode,
                    data: {
                        ...result.data,
                        documents: docs.data,
                    },
                    message: docs.message,
                };
            }
        }
    }

    console.log("Get last application result:", result);

    return result;
}

export type { ApplicationData };