import { useState, useEffect } from "react";

import CommentsDialog from "./CommentsDialog";
import { Status, statusData } from "./ApplicationContent";
import { FileSpec } from "@/data/filesRequirements";
import { ApplicationFullData } from "@/utils/api";
import { Download } from "@/utils/docsApi";

type ApplicationFileProps = {
    application: ApplicationFullData
    name: string,
    files: FileSpec[],
    status: Status,
    onAccept?: (name: string) => void,
    onDeny?: (name: string, comments: string) => void,
};

function ApplicationFile(props: ApplicationFileProps) {
    const [disabled, setDisabled] = useState(false);
    const [dialog, setDialog] = useState(false);

    const handleDownload = async (fileName: string, downloadName: string) => {
        const download = await Download(
            props.application.user.guid,
            props.application.application.id.toString(),
            fileName,
            downloadName
        );
        if (download)
            window.open(download.url, "_blank", "noreferrer");
    };

    const handleAccept = () => {
        if (props.status !== "accepted") {
            setDisabled(true);
            props.files.forEach(file => props.onAccept && file.fileName && props.onAccept(file.fileName));
        }
    };

    const handleDeny = (comments: string) => {
        if (props.status !== "denied") {
            setDisabled(true);
            props.files.forEach(file => props.onDeny && file.fileName && props.onDeny(file.fileName, comments));
        }
    };

    const handleOpenDialog = () => {
        if (props.status !== "denied")
            setDialog(true);
    }

    const handleCloseDialog = () => {
        setDialog(false);
    }

    useEffect(() => setDisabled(false), [props.status]);

    return (
        <tr>
            <td>
                <div className="doc-container">
                    <p className="doc-name">{props.name}</p>
                    <div className={"doc-actions-container" + (disabled ? " disabled" : "")}>
                        {props.files.map((file, index) => (
                            <a
                                key={index}
                                className="doc-download-action action"
                                onClick={() => handleDownload(file.fileName ?? "", file.displayName ?? "")}
                            >
                                <p className="file-name">{file.displayName}</p>
                                <div className="doc-download-action-icon">
                                    <svg width="14" height="19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.7001 9.75253C8.7001 9.5039 8.49872 9.30253 8.2501 9.30253H7.3501C7.10147 9.30253 6.9001 9.5039 6.9001 9.75253V12.9029H5.0671C4.66547 12.9029 4.46522 13.3893 4.75022 13.6724L7.46185 16.3638C7.64897 16.5494 7.95085 16.5494 8.13797 16.3638L10.8496 13.6724C11.1346 13.3897 10.9343 12.9029 10.5327 12.9029H8.7001V9.75253ZM14.4687 4.57415L11.3228 1.42865C10.9853 1.09115 10.5278 0.899902 10.052 0.899902H2.39972C1.40635 0.903652 0.600098 1.7099 0.600098 2.70328V18.3003C0.600098 19.2937 1.40635 20.0999 2.39972 20.0999H13.1975C14.1912 20.0999 15.0001 19.2937 15.0001 18.3003V5.84878C15.0001 5.3729 14.8062 4.91165 14.4687 4.57415ZM10.1982 2.84953L13.0516 5.70253H10.1982V2.84953ZM13.2001 18.3003H2.39972V2.70328H8.3986V6.60253C8.3986 7.10128 8.79985 7.50215 9.2986 7.50215H13.2001V18.3003Z" fill="#26323D"/>
                                    </svg>
                                </div>
                            </a>
                        ))}
                        <a
                            className={"feedback-action action accepted" + (props.status === "accepted" ? " selected" : (props.status === "denied" ? " disabled" : ""))}
                            onClick={handleAccept}
                        >
                            <div className="feedback-action-icon">
                                {statusData.accepted.icon}
                            </div>
                            <p className="strong">Aprobar</p>
                        </a>
                        <a
                            className={"feedback-action action denied" + (props.status === "denied" ? " selected" : (props.status === "accepted" ? " disabled" : ""))}
                            onClick={handleOpenDialog}
                        >
                            <div className="feedback-action-icon">
                                {statusData.denied.icon}
                            </div>
                            <p className="strong">Denegar</p>
                        </a>
                    </div>
                </div>
                <CommentsDialog
                    targetLabel="el documento"
                    open={dialog}
                    onSubmit={handleDeny}
                    onClose={handleCloseDialog}
                />
            </td>
        </tr>
    );
}

export default ApplicationFile;