import { useState, useEffect } from "react";

import ApproveDialog from "./ApproveDialog";
import CommentsDialog from "./CommentsDialog";
import { Status, statusData } from "./ApplicationContent";

type FeedbackButtonsProps = {
    status: Status,
    disabled?: boolean,
    onApprove?: () => void,
    onDeny?: (coments: string) => void,
};

function FeedbackButtons(props: FeedbackButtonsProps) {
    const [disabled, setDisabled] = useState(false);
    const [approveDialog, setApproveDialog] = useState(false);
    const [commentsDialog, setCommentsDialog] = useState(false);

    const handleAccept = () => {
        if (props.status !== "accepted") {
            setDisabled(true);
            props.onApprove && props.onApprove();
        }
    };

    const handleDeny = (comments: string) => {
        if (props.status !== "denied") {
            setDisabled(true);
            props.onDeny && props.onDeny(comments);
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
        <>
            <div id="application-feedback-container" className={((props.disabled || disabled) ? " disabled" : "")}>
                <a
                    className={"feedback-action action accepted" + (props.status === "accepted" ? " selected" : "")}
                    onClick={handleOpenApproveDialog}
                >
                    <div className="feedback-action-icon">
                        {statusData.accepted.icon}
                    </div>
                    <p className="strong">Aprobar</p>
                </a>
                <a
                    className={"feedback-action action denied" + (props.status === "denied" ? " selected" : "")}
                    onClick={handleOpenCommentsDialog}
                >
                    <div className="feedback-action-icon">
                        {statusData.denied.icon}
                    </div>
                    <p className="strong">Denegar</p>
                </a>
            </div>
            <ApproveDialog
                targetLabel="esta solicitud"
                open={approveDialog}
                onSubmit={handleAccept}
                onClose={handleCloseApproveDialog}
            />
            <CommentsDialog
                targetLabel="la solicitud"
                open={commentsDialog}
                onSubmit={handleDeny}
                onClose={handleCloseCommentsDialog}
            />
        </>
    );
}

export default FeedbackButtons;