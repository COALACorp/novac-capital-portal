import WatchLaterIcon from "@mui/icons-material/WatchLater";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

type Status = "pending"|"approved"|"denied";

type StatusData = {
    [key in Status]: {
        label: string,
        icon: JSX.Element,
    };
};

const statusData: StatusData = {
    pending: {
        label: "Pendiente",
        icon: <WatchLaterIcon className="pending"/>,
    },
    approved: {
        label: "Aprobado",
        icon: <CheckCircleIcon className="approved" />,
    },
    denied: {
        label: "Rechazado",
        icon: <CancelIcon className="denied" />,
    },
};

type FilesPlanStatusProps = {
    status?: Status,
};

function FilesPlanStatus(props: FilesPlanStatusProps) {
    return (
        <div id="files-plan-status" className={props.status || "pending"}>
            <p className="strong">Estado: {statusData[props.status || "pending"].label}</p>
            <div className="status-indicator">
                {statusData[props.status || "pending"].icon}
            </div>
        </div>
    );
}

export default FilesPlanStatus;
export type { Status }