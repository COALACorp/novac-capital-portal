import "@/styles/filesform.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { GetApplication, ApplicationFullData } from "@/utils/api";
import FilesFormHead from "./FilesFormHead";
import { Status } from "./FilesPlan/FilesPlanStatus";
import RequirementsSection from "./RequirementsSection";
import FileInput from "./FileInput/FileInput";
import Loading from "../Loading";
import Error from "../Error";
import RequiredDocs, { FileSpec, RequirementsState } from "@/data/filesRequirements";

import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { setApplicationId } from "@/features/quotation/quotationSlice";
import { selectUser } from "@/features/user/userSlice";

function AdminFilesForm() {
    const searchParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : undefined;
    const applicationId = searchParams ? searchParams.get("id") : null;
    const router = useRouter();
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const [application, setApplication] = useState<ApplicationFullData|null>();
    const [requirements, setRequirements] = useState<RequirementsState>();

    const refreshApplication = async () => {
        if (applicationId) {
            const applicationData = await GetApplication(applicationId);
            if (applicationData) {
                dispatch(setApplicationId(applicationData.data.application.id));
                setApplication(applicationData.data);
                setRequirements(RequiredDocs[applicationData.data.application.entityType]);
                return true;
            } else
                console.log("Failed to refresh application");
        } else
            console.log("Can't retrieve application. User is null:", user);
        return false;
    };

    const requestUploadedDocuments = () => {
        console.log("Request uploaded requirements");
        if (application && requirements) {
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

    useEffect(() => console.log("Requirements updated:", requirements), [requirements]);

    useEffect(requestUploadedDocuments, [application]);

    useEffect(() => {
        if (!user?.admin) {
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
                    uid={application.user.guid}
                    applicationId={application.application.id.toString()}
                    months={application.application.plan.dues}
                    applicant={application.application.name}
                    taxedPartialities={application.application.partiality}
                    status={application.application.status as Status}
                />
                {requirements && (
                    <>
                        <RequirementsSection title="Requisitos del solicitante">
                            {requirements.applicantFiles.map((requirement, index) => (
                                <FileInput
                                    key={index}
                                    uid={application.user.guid}
                                    applicationId={application.application.id.toString()}
                                    requirement={requirement}
                                />
                            ))}
                        </RequirementsSection>
                        <RequirementsSection title="Requisitos del Aval">
                            {requirements.endorsementFiles.map((requirement, index) => (
                                <FileInput
                                    key={index}
                                    uid={application.user.guid}
                                    applicationId={application.application.id.toString()}
                                    requirement={requirement}
                                />
                            ))}
                        </RequirementsSection>
                    </>
                )}
            </div>
        )
        : application === undefined ? <Loading /> : <Error error={"No se pudo cargar la información relacionada a la aplicación"} />;
}

export default AdminFilesForm;