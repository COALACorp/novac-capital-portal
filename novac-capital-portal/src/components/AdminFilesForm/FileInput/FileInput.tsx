import { useState, useEffect } from "react";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ErrorIcon from "@mui/icons-material/Error";

import DownloadFileAction from "./DownloadFileAction";
import { RequirementSpec } from "@/data/filesRequirements";

type Status = "unknown"|"pending"|"approved"|"denied"|"error";

type StatusIcons = {
    [key in Status]: JSX.Element;
};

const statusIcons: StatusIcons = {
    unknown: <div className="status-indicator unknown" />,
    pending: <WatchLaterIcon className="status-indicator pending" />,
    approved: <CheckCircleIcon className="status-indicator approved" />,
    denied: <CancelIcon className="status-indicator denied" />,
    error: <ErrorIcon className="status-indicator error" />,
};

type SelectedFile = {
    [key: string]: File|undefined,
};

type FileInputProps = {
    uid: string,
    applicationId: string,
    requirement: RequirementSpec,
};

function FileInput(props: FileInputProps) {
    const [status, setStatus] = useState(statusIcons["unknown"]);

    useEffect(() => {
        const t_files = props.requirement.files;
        let newStatus = status;
        if (t_files.find(file => file.status === "pending"))
            newStatus = statusIcons["pending"];
        else if (t_files.find(file => file.status === "error"))
            newStatus = statusIcons["error"];
        else if (t_files.find(file => file.status === "denied"))
            newStatus = statusIcons["denied"];
        else if (t_files.find(file => file.status === "approved"))
            newStatus = statusIcons["approved"];
        else
            newStatus = statusIcons["unknown"];
        setStatus(newStatus);
    }, [props.requirement.files]);

    return (
        <div className="file-input-container">
            <div className="file-input">
                <div className="file-input-label-container">
                    <p className="file-input-label strong">{props.requirement.label}</p>
                </div>
                <div className="file-input-action-container">
                    {props.requirement.files.map((file, index) => (
                        <DownloadFileAction
                            key={index}
                            uid={props.uid}
                            applicationId={props.applicationId}
                            uploaded={file.uploaded}
                            fileName={file.fileName}
                            displayName={file.displayName}
                        />
                    ))}
                    {status}
                </div>
            </div>
        </div>
    );
}

export default FileInput;
export { statusIcons };
export type { Status, SelectedFile };