import "@/styles/filesform.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { GetLastApplication, ApplicationData } from "@/utils/api";
import FilesFormHead from "./FilesFormHead";
import { Status } from "./FilesPlan/FilesPlanStatus";
import RequirementsSection from "./RequirementsSection";
import FileInput, { SelectedFile } from "./FileInput/FileInput";
import Loading from "../Loading";
import Error from "../Error";
import { Upload, Delete } from "@/utils/docsApi";
import defaultRequirements, { FileSpec } from "@/data/filesRequirements";

import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { setApplicationId } from "@/features/quotation/quotationSlice";
import { selectUser } from "@/features/user/userSlice";
import { auth } from "@/utils/firebase";

function FilesForm() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const [application, setApplication] = useState<ApplicationData|null>();
    const [requirements, setRequirements] = useState(defaultRequirements);

    const refreshApplication = async () => {
        if (user) {
            const applicationData = await GetLastApplication(user.uid);
            if (applicationData) {
                dispatch(setApplicationId(applicationData.data.application.id));
                setApplication(applicationData.data);
                return true;
            } else
                console.log("Failed to refresh application");
        } else
            console.log("Can't retrieve application. User is null:", user);
        return false;
    };

    const requestUploadedDocuments = () => {
        console.log("Request uploaded requirements");
        if (application) {
            const newState = { ...requirements };
            Object.keys(newState).forEach(category => {
                const key = category as keyof (typeof newState);
                const newReqs = newState[key].map(requirement => {
                    const newReq = { ...requirement };
                    newReq.files = requirement.files.map(file => {
                        const doc = application.documents.find(doc => doc.name.split("|")[0] === file.name || doc.name.includes(file.name));
                        const newFile: FileSpec = { name: file.name };
                        if (doc) {
                            newFile.uploaded = true;
                            newFile.status = doc.status.toLowerCase() as Status;
                            newFile.fileName = doc.name;
                            newFile.displayName = doc.name.split("|")[1];
                        }
                        return newFile;
                    });
                    return newReq;
                });
                newState[key] = newReqs;
            });
            console.log("Updated requirements:", newState);
            setRequirements(newState);
        }
    };

    const handleUpload = async (filesToSend: SelectedFile) => {
        let result = false;
        console.log("Send clicked");
        if (user && application) {
            console.log("Files:", filesToSend);
            const results = []
            for (const name in filesToSend) {
                const file = filesToSend[name];
                console.log("File:", name, file);
                if (file) {
                    const fileName = `${name}|${file.name}`;
                    const result = await Upload(user.uid, application.application.id.toString(), fileName, file);
                    if (result) {
                        results.push(true);
                        continue;
                    }
                }
                results.push(false);
            };
            console.log("Upload result:", results);
            result = !results.includes(false);
        }

        if (!result)
            console.log("Failed to upload files");
        refreshApplication();

        return result;
    };

    const handleRemove = async (name: string) => {
        console.log("Remove clicked");
        let result = false;
        if (user && application) {
            console.log("File:", name);
            const deleteResult = await Delete(user.uid, application.application.id.toString(), name);
            console.log("Delete result:", deleteResult);
            if (deleteResult)
                result = true;
        }
        refreshApplication()
        return result;
    };

    useEffect(() => console.log("Requirements updated:", requirements), [requirements]);

    useEffect(requestUploadedDocuments, [application]);

    useEffect(() => {
        if (!user?.registered) {
            // auth.signOut();
            router.push("/signin");
            return;
        }

        (async () => {
            if (await refreshApplication())
                return;
            router.push("/");
        })();
    }, [user]);

    return application
        ? (
            <div id="files-form-container">
                <FilesFormHead
                    months={application.application.plan.dues}
                    applicant={application.application.name}
                    taxedPartialities={application.application.partiality}
                    status={application.application.status as Status}
                />
                <RequirementsSection title="Requisitos del solicitante">
                    {requirements.applicantFiles.map((requirement, index) => (
                        <FileInput
                            key={index}
                            requirement={requirement}
                            onUpload={handleUpload}
                            onRemove={handleRemove}
                        />
                    ))}
                </RequirementsSection>
                <RequirementsSection title="Requisitos del Aval">
                    {requirements.endorsementFiles.map((requirement, index) => (
                        <FileInput
                            key={index}
                            requirement={requirement}
                            onUpload={handleUpload}
                            onRemove={handleRemove}
                        />
                    ))}
                </RequirementsSection>
            </div>
        )
        : application === undefined ? <Loading /> : <Error error={"No se pudo cargar la información relacionada a la aplicación"} />;
}

export default FilesForm;