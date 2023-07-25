import axios from "axios";

const docsApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_DOCS_API_ENDPOINT,
    headers: {
        "access-control-allow-origin": "*",
        "access-control-allow-headers": "*",
    },
});

type APIResponse = {
    message: string,
};

type APIDownloadResponse = {
    url: string,
};

export async function Template(fileName: string): Promise<APIDownloadResponse|null> {
    try {
        console.log("API request download template:", fileName);
        const response = await docsApi.get(`/template/${fileName}`);
        console.log("API response download template:", response.data);

        return response.status === 200 ? response.data ?? null : null;
    } catch (error) {
        console.log("Error while download:", error);
    }
    return null;
}

export async function Upload(guid: string, appId: string, fileName: string, file: File): Promise<APIResponse|null> {
    try {
        const formData = new FormData();
        formData.append("file", file, file.name);

        console.log("API request upload:", guid, appId, fileName);
        const response = await docsApi.post(`/upload/${guid}/${appId}/${fileName}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        console.log("API response upload:", response.data);

        return response.status === 200 ? response.data ?? null : null;
    } catch (error) {
        console.log("Error while upload:", error);
    }
    return null;
}

export async function Download(guid: string, appId: string, fileName: string): Promise<APIDownloadResponse|null> {
    try {
        console.log("API request download:", guid, appId, fileName);
        const response = await docsApi.get(`/download/${guid}/${appId}/${fileName}`);
        console.log("API response download:", response.data);

        return response.status === 200 ? response.data ?? null : null;
    } catch (error) {
        console.log("Error while download:", error);
    }
    return null;
}

export async function Delete(guid: string, appId: string, fileName: string): Promise<APIDownloadResponse|null> {
    try {
        console.log("API request delete:", guid, appId, fileName);
        const response = await docsApi.delete(`/delete/${guid}/${appId}/${fileName}`);
        console.log("API response delete:", response.data);

        return response.status === 200 ? response.data ?? null : null;
    } catch (error) {
        console.log("Error while delete:", error);
    }
    return null;
}