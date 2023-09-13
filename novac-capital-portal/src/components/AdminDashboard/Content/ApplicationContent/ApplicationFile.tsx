import { useState, useEffect } from "react";
import Image from "next/image";

import ApproveDialog from "./ApproveDialog";
import CommentsDialog from "./CommentsDialog";
import MultiFileCommentsDialog, { FileComment } from "./MultiFileCommentsDialog";
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
    const [approveDialog, setApproveDialog] = useState(false);
    const [commentsDialog, setCommentsDialog] = useState(false);

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
            // props.files.forEach(file => props.onDeny && file.fileName && props.onDeny(file.fileName, comments));
            const t_file = props.files[0];
            props.onDeny && t_file.fileName && props.onDeny(t_file.fileName, comments);
        }
    };

    const handleDenyMultiple = (comments: FileComment[]) => {
        if (props.status !== "denied") {
            setDisabled(true);
            comments.forEach(comment => props.onDeny && props.onDeny(comment.fileName, comment.comment));
        }
    };

    const handleOpenApproveDialog = () => {
        if (props.status !== "accepted")
            setApproveDialog(true);
    }

    const handleCloseApproveDialog = () => {
        setApproveDialog(false);
    }
    
    const handleOpenCommentsDialog = () => {
        if (props.status !== "denied")
            setCommentsDialog(true);
    }

    const handleCloseCommentsDialog = () => {
        setCommentsDialog(false);
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
                                <Image src="icons/Download.svg" width={14} height={19} alt="" />
                            </a>
                        ))}
                        <a
                            className={"feedback-action action accepted" + (props.status === "accepted" ? " selected" : (props.status === "denied" || props.files.find(file => !file.uploaded) ? " disabled" : ""))}
                            onClick={handleOpenApproveDialog}
                        >
                            <div className="feedback-action-icon">
                                {statusData.accepted.icon}
                            </div>
                            <p className="strong">{props.status === "accepted" ? "Aprobado" : "Aprobar"}</p>
                        </a>
                        <a
                            className={"feedback-action action denied" + (props.status === "denied" ? " selected" : (props.status === "accepted" ? " disabled" : ""))}
                            onClick={handleOpenCommentsDialog}
                        >
                            <div className="feedback-action-icon">
                                {statusData.denied.icon}
                            </div>
                            <p className="strong">{props.status === "denied" ? "Denegado" : "Denegar"}</p>
                        </a>
                    </div>
                </div>
                <ApproveDialog
                    targetLabel="este documento"
                    open={approveDialog}
                    onSubmit={handleAccept}
                    onClose={handleCloseApproveDialog}
                />
                {props.files.length === 1 ? (
                    <CommentsDialog
                        targetLabel="el documento"
                        open={commentsDialog}
                        onSubmit={handleDeny}
                        onClose={handleCloseCommentsDialog}
                    />
                ) : (
                    <MultiFileCommentsDialog
                        files={props.files}
                        targetLabel="el documento"
                        open={commentsDialog}
                        onSubmit={handleDenyMultiple}
                        onClose={handleCloseCommentsDialog}
                    />
                )}
            </td>
        </tr>
    );
}

export default ApplicationFile;