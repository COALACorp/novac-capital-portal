import axios from "axios";

import { Status } from "@/components/FilesForm/FileInput/FileInput";

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
    name: string,
    entityType: string,
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
    createdAt: string,
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

type ApplicationsPagination = {
    applications: APIApplicationData[],
    pagination: {
        count: number,
        current: number,
        previous: number|null,
        next: number|null,
        last: number,
    },
};

type ApplicationData = {
    user: APIUserData,
    application: APIApplicationData,
};

type ApplicationFullData = {
    user: APIUserData,
    application: APIApplicationData,
    documents: APIUserApplicationDocs[],
};

type APIFeedbackCreateData = {
    feedbackId: number,
};

type APIResponse<T> = null|{
    statusCode: number,
    data: T,
    message: string,
};

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    },
});

export function InitAPI(token: string) {
    api.defaults.headers.common["session-token"] = token;
}

export async function CreateUser(guid: string, email: string, phone: string): Promise<APIResponse<APIUserCreateData>> {
    try {
        const payload = {
            guid,
            email,
            phone,
        };
        // console.log("API request create user:", payload);
        const response = await api.post("/user", payload);
        // console.log("API response create user:", response.data);
    
        return response.status === 200 ? response.data ?? null : null;   
    } catch (error) {
        console.log("Error while creating user:", error);
    }
    return null;
}

export async function GetUser(guid: string): Promise<APIResponse<APIUserData>> {
    try {
        // console.log("API request get user:", guid);
        const response = await api.get("/user/" + guid);
        // console.log("API response get user:", response.data);

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
    planId: number,
    entityType: string
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
        entityType,
    };
    // console.log("API request create application:", payload);
    const response = await api.post<APIResponse<APIApplicationCreateData>>("/application", payload);
    // console.log("API response create application:", response.data);

    return response.status === 200 ? response.data ?? null : null;
}

export async function GetApplicationDocs(guid: string, applicationId: number): Promise<APIResponse<APIUserApplicationDocs[]>|null> {
    // console.log("API request get documents:", guid);
    const response = await api.get<APIResponse<APIUserApplicationDocs[]>>(`/document/${guid}/${applicationId}`);
    // console.log("API response get documents:", response.data);

    return response.status === 200 ? response.data ?? null : null;
}

export async function GetLastApplication(guid: string): Promise<APIResponse<ApplicationFullData>|null> {
    // console.log("API request get user applications:", guid);
    const response = await api.get<APIResponse<APIUserApplicationsData>>(`/application/user/${guid}`);
    // console.log("API response get user applications:", response.data);

    let result: APIResponse<ApplicationFullData>|null = null;
    if (response.status === 200 && response.data) {
        const data = response.data;
        const latest = data.data.applications.find(application => application.id === Math.max(...data.data.applications.map(application => application.id)));
        if (latest) {
            result = {
                statusCode: data.statusCode,
                data: {
                    user: data.data.user,
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

    // console.log("Get last application result:", result);

    return result;
}

export async function GetAllApplications(n: number, page: number, status?: string, search?: string): Promise<APIResponse<ApplicationsPagination>|null> {
    // console.log("API request get all applications:", n, page, status, search);
    const response = await api.get<APIResponse<ApplicationsPagination>>("/application", { params: { n, page, status, search } });
    // console.log("API response get all applications:", response.data);

    return response.status === 200 ? response.data ?? null : null;
}

export async function GetApplication(applicationId: number): Promise<APIResponse<ApplicationFullData>|null> {
    // console.log("API request get application:", applicationId);
    const response = await api.get<APIResponse<ApplicationData>>("/application/" + applicationId);
    // console.log("API response get application:", response.data);

    let result: APIResponse<ApplicationFullData>|null = null;
    if (response.status === 200 && response.data) {
        const data = response.data;
        const application = data.data.application;
        if (application) {
            result = {
                statusCode: data.statusCode,
                data: {
                    user: data.data.user,
                    application: application,
                    documents: [],
                },
                message: data.message,
            }
            const docs = await GetApplicationDocs(data.data.user.guid, application.id);
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

    // console.log("Get application result:", result);

    return result;
}

export async function CreateApplicationFeedback(applicationId: number, approval: boolean, comments?: string): Promise<APIResponse<APIFeedbackCreateData>> {
    try {
        const payload = {
            applicationId,
            comments,
            approval,
        };
        // console.log("API request create application feedback:", payload);
        const response = await api.post("/feedback", payload);
        // console.log("API response create application feedback:", response.data);
    
        return response.status === 200 ? response.data ?? null : null;   
    } catch (error) {
        console.log("Error while creating application feedback:", error);
    }
    return null;
}

export async function CreateDocumentFeedback(documentId: number, approval: boolean, comments?: string): Promise<APIResponse<APIFeedbackCreateData>> {
    try {
        const payload = {
            documentId,
            comments,
            approval,
        };
        // console.log("API request create document feedback:", payload);
        const response = await api.post("/feedback", payload);
        // console.log("API response create document feedback:", response.data);
    
        return response.status === 200 ? response.data ?? null : null;   
    } catch (error) {
        console.log("Error while creating document feedback:", error);
    }
    return null;
}

export type { ApplicationFullData, ApplicationsPagination, ApplicationData };