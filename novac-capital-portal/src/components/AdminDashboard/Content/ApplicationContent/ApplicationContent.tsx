import { useState, useEffect } from "react";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import SearchBar from "../SearchBar";
import ApplicationData from "./ApplicationData";
import ApplicationFilesSection from "./ApplicationFilesSection";
import FeedbackButtons from "./FeedbackButtons";
import { ApplicationFullData, CreateApplicationFeedback, GetApplication } from "@/utils/api";
import RequiredDocs, { RequirementsState, FileSpec } from "@/data/filesRequirements";

type Status = "pending"|"accepted"|"denied";

type StatusIcons = {
    [key in Status]: {
        label: string,
        icon: JSX.Element,
    };
};

const statusData: StatusIcons = {
    pending: {
        label: "Pendiente",
        icon: <WatchLaterIcon />,
    },
    accepted: {
        label: "Aprobada",
        icon: <CheckCircleIcon />,
    },
    denied: {
        label: "Rechazada",
        icon: <CancelIcon />,
    },
};

type ApplicationContentProps = {
    applicationId: number,
    onSearch?: (search?: string) => void,
    onReturn?: () => void,
};

function ApplicationContent(props: ApplicationContentProps) {
    const [application, setApplication] = useState<ApplicationFullData>();
    const [requirements, setRequirements] = useState<RequirementsState>();

    const handleApplicationApproval = async () => {
        await CreateApplicationFeedback(props.applicationId, true);
        refreshApplication();
    };

    const handleApplicationDenial = async () => {
        await CreateApplicationFeedback(props.applicationId, false);
        refreshApplication();
    };

    const refreshApplication = () => {
        GetApplication(props.applicationId)
            .then(appData => {
                if (appData) {
                    const newApplication = appData.data;
                    const newRequirements = RequiredDocs[newApplication.application.entityType];

                    if (newApplication && newRequirements) {
                        Object.keys(newRequirements).forEach(category => {
                            const key = category as keyof (typeof newRequirements);
                            const newReqs = newRequirements[key].map(requirement => {
                                const newReq = { ...requirement };
                                newReq.files = requirement.files.map(file => {
                                    const doc = newApplication.documents.find(doc => doc.name.split("|")[0] === file.name || doc.name.includes(file.name));
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
                            newRequirements[key] = newReqs;
                        });
                    }

                    setApplication(newApplication);
                    setRequirements(newRequirements);
                }
            })
            .catch(error => console.error("Error while refreshing application:", error));
    };

    useEffect(() => {
        refreshApplication();
    }, [props.applicationId]);

    return application ? (
        <>
            <div id="application-header-container">
                <div id="content-header">
                    <div id="application-header">
                        <a className="action" onClick={props.onReturn}>
                            <div id="return-icon">
                                <svg width="27" height="14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M28 8H1" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M8 15L1 8L8 1" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                        </a>
                        <p id="content-header-title" className="strong">{application.application.name}</p>
                        <div id="status-indicator" className={"strong " + application.application.status.toLowerCase()}>
                            <p>Estado: {statusData[application.application.status.toLowerCase() as Status].label}</p>
                            <div id="status-indicator-icon">
                                {statusData[application.application.status.toLowerCase() as Status].icon}
                            </div>
                        </div>
                    </div>
                    <SearchBar onSearch={props.onSearch} />
                </div>
                <ApplicationData application={application} />
            </div>
            <ApplicationFilesSection
                application={application}
                requirements={requirements}
                onUpdate={refreshApplication}
            />
            <FeedbackButtons
                status={application.application.status.toLowerCase() as Status}
                onApprove={handleApplicationApproval}
                onDeny={handleApplicationDenial}
            />
        </>
    ) : (
        <></>
    );
}

export default ApplicationContent;
export type { Status };
export { statusData };