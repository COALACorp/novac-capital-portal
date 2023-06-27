import { useState, ChangeEvent } from "react";
import Box from "@mui/material/Box";
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ErrorIcon from '@mui/icons-material/Error';

type Status = "unknown"|"pending"|"approved"|"denied"|"error";

type StatusIcons = {
    [key in Status]: JSX.Element;
};

const icons = {
    download: (
        <svg width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path id="Vector" d="M8.3002 9.25263C8.3002 9.004 8.09882 8.80263 7.8502 8.80263H6.9502C6.70157 8.80263 6.5002 9.004 6.5002 9.25263V12.403H4.6672C4.26557 12.403 4.06532 12.8894 4.35032 13.1725L7.06195 15.8639C7.24907 16.0495 7.55095 16.0495 7.73807 15.8639L10.4497 13.1725C10.7347 12.8898 10.5344 12.403 10.1328 12.403H8.3002V9.25263ZM14.0688 4.07425L10.9229 0.928752C10.5854 0.591252 10.1279 0.400002 9.65207 0.400002H1.99982C1.00645 0.403752 0.200195 1.21 0.200195 2.20338V17.8004C0.200195 18.7937 1.00645 19.6 1.99982 19.6H12.7976C13.7913 19.6 14.6002 18.7937 14.6002 17.8004V5.34888C14.6002 4.873 14.4063 4.41175 14.0688 4.07425V4.07425ZM9.79832 2.34963L12.6517 5.20263H9.79832V2.34963V2.34963ZM12.8002 17.8004H1.99982V2.20338H7.9987V6.10263C7.9987 6.60138 8.39995 7.00225 8.8987 7.00225H12.8002V17.8004Z" fill="#26323D"/>
        </svg>
    ),
    upload: (
        <svg width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.4687 4.07425L11.3228 0.928752C10.9853 0.591252 10.5278 0.400002 10.052 0.400002H2.39972C1.40635 0.403752 0.600098 1.21 0.600098 2.20338V17.8004C0.600098 18.7938 1.40635 19.6 2.39972 19.6H13.1975C14.1912 19.6 15.0001 18.7938 15.0001 17.8004V5.34888C15.0001 4.873 14.8062 4.41175 14.4687 4.07425ZM10.1982 2.34963L13.0516 5.20263H10.1982V2.34963ZM13.2001 17.8004H2.39972V2.20338H8.3986V6.10263C8.3986 6.60138 8.79985 7.00225 9.2986 7.00225H13.2001V17.8004ZM7.46185 8.94213L4.75022 11.6335C4.46522 11.9163 4.66547 12.403 5.0671 12.403H6.9001V15.553C6.9001 15.8016 7.10147 16.003 7.3501 16.003H8.2501C8.49872 16.003 8.7001 15.8016 8.7001 15.553V12.403H10.5331C10.9347 12.403 11.135 11.9166 10.85 11.6335L8.13835 8.94213C7.95122 8.7565 7.64897 8.7565 7.46185 8.94213Z" fill="black"/>
        </svg>
    ),
    delete: (
        <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.2502 16H11.1502C11.2695 16 11.384 15.9526 11.4684 15.8682C11.5528 15.7838 11.6002 15.6693 11.6002 15.55V7.44999C11.6002 7.33065 11.5528 7.21619 11.4684 7.1318C11.384 7.0474 11.2695 6.99999 11.1502 6.99999H10.2502C10.1308 6.99999 10.0164 7.0474 9.932 7.1318C9.84761 7.21619 9.8002 7.33065 9.8002 7.44999V15.55C9.8002 15.6693 9.84761 15.7838 9.932 15.8682C10.0164 15.9526 10.1308 16 10.2502 16ZM16.4002 3.39999H13.3098L12.0348 1.27374C11.8748 1.00712 11.6485 0.786503 11.3778 0.633378C11.1072 0.480252 10.8015 0.399846 10.4906 0.399994H6.70982C6.399 0.399976 6.09347 0.480443 5.82298 0.633563C5.55249 0.786682 5.32626 1.00723 5.16632 1.27374L3.89057 3.39999H0.800195C0.641065 3.39999 0.488453 3.46321 0.375931 3.57573C0.263409 3.68825 0.200195 3.84086 0.200195 3.99999L0.200195 4.59999C0.200195 4.75912 0.263409 4.91174 0.375931 5.02426C0.488453 5.13678 0.641065 5.19999 0.800195 5.19999H1.4002V17.8C1.4002 18.2774 1.58984 18.7352 1.9274 19.0728C2.26497 19.4104 2.72281 19.6 3.2002 19.6H14.0002C14.4776 19.6 14.9354 19.4104 15.273 19.0728C15.6106 18.7352 15.8002 18.2774 15.8002 17.8V5.19999H16.4002C16.5593 5.19999 16.7119 5.13678 16.8245 5.02426C16.937 4.91174 17.0002 4.75912 17.0002 4.59999V3.99999C17.0002 3.84086 16.937 3.68825 16.8245 3.57573C16.7119 3.46321 16.5593 3.39999 16.4002 3.39999ZM6.6442 2.30912C6.66425 2.27574 6.69262 2.24814 6.72654 2.22901C6.76046 2.20988 6.79876 2.19988 6.8377 2.19999H10.3627C10.4016 2.19995 10.4398 2.20998 10.4736 2.2291C10.5075 2.24823 10.5358 2.2758 10.5558 2.30912L11.2106 3.39999H5.98982L6.6442 2.30912ZM14.0002 17.8H3.2002V5.19999H14.0002V17.8ZM6.0502 16H6.9502C7.06954 16 7.184 15.9526 7.26839 15.8682C7.35278 15.7838 7.4002 15.6693 7.4002 15.55V7.44999C7.4002 7.33065 7.35278 7.21619 7.26839 7.1318C7.184 7.0474 7.06954 6.99999 6.9502 6.99999H6.0502C5.93085 6.99999 5.81639 7.0474 5.732 7.1318C5.64761 7.21619 5.6002 7.33065 5.6002 7.44999V15.55C5.6002 15.6693 5.64761 15.7838 5.732 15.8682C5.81639 15.9526 5.93085 16 6.0502 16Z" fill="#EB5757"/>
        </svg>
    ),
};

const statusIcons: StatusIcons = {
    unknown: <div className="status-indicator unknown" />,
    pending: <WatchLaterIcon className="status-indicator pending" />,
    approved: <CheckCircleIcon className="status-indicator approved" />,
    denied: <CancelIcon className="status-indicator denied" />,
    error: <ErrorIcon className="status-indicator error" />,
};

type FileInputActionProps = {
    name: string,
    templateUrl?: string,
    status?: Status,
};

function FileInputAction(props: FileInputActionProps) {
    const [file, setFile] = useState<File>();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files)
            setFile(event.target.files[0]);
    };

    const handleRemove = () => {
        setFile(undefined);
    };

    return (
        <Box className="file-input-action-container">
            {props.templateUrl && (
                <a
                    className="file-input-action"
                    href={props.templateUrl}
                    target="_blank"
                    download="Test_file"
                >
                    <p>Descargar formato</p>
                    {icons.download}
                </a>
            )}
            {file ? (
                <Box className="file-input-action">
                    <p>{file.name}</p>
                    <a className="file-remove-action" onClick={handleRemove}>{icons.delete}</a>
                </Box>
            ) : (
                <label className="file-input-action">
                    <p>Subir</p>
                    {icons.upload}
                    <input id={"file-" + props.name} type="file" name={props.name} onChange={handleChange} />
                </label>
            )}
            {statusIcons[props.status ?? "unknown"]}
        </Box>
    );
}

export default FileInputAction;
export type { Status };