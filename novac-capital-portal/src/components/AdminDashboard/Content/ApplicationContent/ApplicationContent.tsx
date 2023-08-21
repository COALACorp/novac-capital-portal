import WatchLaterIcon from "@mui/icons-material/WatchLater";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import SearchBar from "../SearchBar";
import ApplicationDocument from "./ApplicationDocument";

type Status = "pending"|"accepted"|"denied";

type StatusIcons = {
    [key in Status]: JSX.Element;
};

const statusIcons: StatusIcons = {
    pending: <WatchLaterIcon />,
    accepted: <CheckCircleIcon />,
    denied: <CancelIcon />,
};

type ApplicationContentProps = {
    onSearch?: (search?: string) => void,
    onReturn?: () => void,
};

function ApplicationContent(props: ApplicationContentProps) {
    return (
        <>
            <div id="content-header">
                <div id="application-header-container">
                    <a onClick={props.onReturn}>
                        <div id="return-icon">
                            <svg width="27" height="14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M28 8H1" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M8 15L1 8L8 1" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                    </a>
                    <p id="content-header-title" className="strong">Ana García</p>
                    <div id="status-indicator" className="strong pending">
                        <p>Estado: Pendiente</p>
                        <div id="status-indicator-icon">
                            {statusIcons.pending}
                        </div>
                    </div>
                </div>
                <SearchBar onSearch={props.onSearch} />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>DOCUMENTOS CARGADOS</th>
                    </tr>
                </thead>
                <tbody>
                    <ApplicationDocument
                        name="Solicitud de financiamiento"
                        docs={["Doc 1.1", "Doc 1.2"]}
                        status="accepted"
                        onAccept={() => console.log("Accept doc 1")}
                        onDeny={() => console.log("Deny doc 1")}
                    />
                    <ApplicationDocument
                        name="Solicitud de financiamiento"
                        docs={["Doc 2",]}
                        status="denied"
                        onAccept={() => console.log("Accept doc 2")}
                        onDeny={() => console.log("Deny doc 2")}
                    />
                    <ApplicationDocument
                        name="Solicitud de financiamiento"
                        docs={["Doc 3"]}
                        status="pending"
                        onAccept={() => console.log("Accept doc 3")}
                        onDeny={() => console.log("Deny doc 3")}
                    />
                </tbody>
            </table>
        </>
    );
}

export default ApplicationContent;
export type { Status };
export { statusIcons };