import { useState, useEffect } from "react";
import Image from "next/image";
import CircularProgress from '@mui/material/CircularProgress';
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import SyncIcon from '@mui/icons-material/Sync';

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
    const [loading, setLoading] = useState(false);
    const [application, setApplication] = useState<ApplicationFullData>();
    const [requirements, setRequirements] = useState<RequirementsState>();

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

    const handleApplicationApproval = async () => {
        await CreateApplicationFeedback(props.applicationId, true);
        refreshApplication();
    };

    const handleApplicationDenial = async (comments: string) => {
        await CreateApplicationFeedback(props.applicationId, false, comments);
        refreshApplication();
    };

    const handleRefresh = () => {
        setLoading(true);
        refreshApplication();
    };

    useEffect(() => {
        refreshApplication();
    }, [props.applicationId]);

    useEffect(() => {
        setLoading(false);
    }, [application]);

    return application ? (
        <>
            <div id="application-header-container">
                <div id="content-header">
                    <div id="application-header">
                        <a className="action" onClick={props.onReturn}>
                            <Image src="icons/ReturnArrow.svg" width={27} height={14} alt="" />
                        </a>
                        <p id="content-header-title" className="strong">{application.application.name}</p>
                        <div id="status-indicator" className={"strong " + application.application.status.toLowerCase()}>
                            <p>Estado: {statusData[application.application.status.toLowerCase() as Status].label}</p>
                            <div id="status-indicator-icon">
                                {statusData[application.application.status.toLowerCase() as Status].icon}
                            </div>
                        </div>
                        <a id="refresh-button" className={"action" + (loading ? " loading" : "")} onClick={handleRefresh}>
                            <SyncIcon />
                        </a>
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
        <div id="application-loading">
            <CircularProgress
                size="8rem"
                sx={{
                    color: "#52617A",
                }}
            />
        </div>
    );
}

export default ApplicationContent;
export type { Status };
export { statusData };