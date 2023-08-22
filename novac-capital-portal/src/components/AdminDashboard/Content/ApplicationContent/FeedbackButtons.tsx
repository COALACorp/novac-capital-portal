import { useState, useEffect } from "react";

import { Status, statusData } from "./ApplicationContent";

type FeedbackButtonsProps = {
    status: Status,
    onApprove?: () => void,
    onDeny?: () => void,
};

function FeedbackButtons(props: FeedbackButtonsProps) {
    const [disabled, setDisabled] = useState(false);

    const handleAccept = () => {
        if (props.status !== "accepted") {
            setDisabled(true);
            props.onApprove && props.onApprove();
        }
    };

    const handleDeny = () => {
        if (props.status !== "denied") {
            setDisabled(true);
            props.onDeny && props.onDeny();
        }
    };

    useEffect(() => setDisabled(false), [props.status]);

    return (
        <div id="application-feedback-container" className={(disabled ? " disabled" : "")}>
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
                onClick={handleDeny}
            >
                <div className="feedback-action-icon">
                    {statusData.denied.icon}
                </div>
                <p className="strong">Denegar</p>
            </a>
        </div>
    );
}

export default FeedbackButtons;