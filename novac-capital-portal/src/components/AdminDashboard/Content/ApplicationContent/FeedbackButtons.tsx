import { useState, useEffect } from "react";

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
    const [dialog, setDialog] = useState(false);

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

    const handleOpenDialog = () => {
        if (props.status !== "denied")
            setDialog(true);
    }

    const handleCloseDialog = () => {
        setDialog(false);
    }

    useEffect(() => setDisabled(false), [props.status]);

    return (
        <>
            <div id="application-feedback-container" className={((props.disabled || disabled) ? " disabled" : "")}>
                <a
                    className={"feedback-action action accepted" + (props.status === "accepted" ? " selected" : "")}
                    onClick={handleAccept}
                >
                    <div className="feedback-action-icon">
                        {statusData.accepted.icon}
                    </div>
                    <p className="strong">Aprobar</p>
                </a>
                <a
                    className={"feedback-action action denied" + (props.status === "denied" ? " selected" : "")}
                    onClick={handleOpenDialog}
                >
                    <div className="feedback-action-icon">
                        {statusData.denied.icon}
                    </div>
                    <p className="strong">Denegar</p>
                </a>
            </div>
            <CommentsDialog
                targetLabel="la solicitud"
                open={dialog}
                onSubmit={handleDeny}
                onClose={handleCloseDialog}
            />
        </>
    );
}

export default FeedbackButtons;