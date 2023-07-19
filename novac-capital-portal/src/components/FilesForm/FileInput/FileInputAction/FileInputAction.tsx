import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ErrorIcon from "@mui/icons-material/Error";
import { extname } from "path";

import UploadFileAction from "./UploadFileAction";
import SendFileButton from "./SendFileButton";
import { Template, Upload, Delete } from "@/utils/docsApi";

import { useAppSelector } from "@/app/hooks";
import { selectQuotation } from "@/features/quotation/quotationSlice";
import { selectUser } from "@/features/user/userSlice";
import next from "next/types";

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

type FileInputActionProps = {
    files: string[],
    template?: string,
    status?: Status,
    onChange?: (name: string, value: File|undefined) => void,
};

function FileInputAction(props: FileInputActionProps) {
    const appId = useAppSelector(selectQuotation)?.applicationId;
    const user = useAppSelector(selectUser);
    const [status, setStatus] = useState<Status>(props.status ?? "unknown");
    const [files, setFiles] = useState<SelectedFile>({});
    const [sendable, setSendable] = useState(false);

    const handleGetTemplate = async () => {
        if (props.template) {
            const template = await Template(props.template);
            if (template)
                window.open(template.url, "_blank", "noreferrer");
        }
    };

    const handleChange = (name: string, value: File|undefined) => {
        const newFiles = { ...files };
        newFiles[name] = value;
        setFiles(newFiles);

        props.onChange && props.onChange(name, value);
    };

    const handleSend = async () => {
        console.log("Send clicked");
        if (user && appId) {
            console.log("Files:", files);
            const results = []
            for (const index in props.files) {
                const name = props.files[index];
                const file = files[name];
                console.log("File:", name, file);
                if (file) {
                    const fileName = name + extname(file.name);
                    const result = await Upload(user.uid, appId.toString(), fileName, file);
                    if (result) {
                        results.push(true);
                        continue;
                    }
                }
                results.push(false);
            };
            console.log("Upload result:", results);
            if (!results.includes(false)) {
                setStatus("pending");
                setFiles({});
                return;
            }
        }
        console.log("Failed to upload files");
    };

    const handleRemove = async (name: string) => {
        console.log("Remove clicked");
        if (user && appId) {
            console.log("File:", name);
            const deleteResult = await Delete(user.uid, appId.toString(), name);
            console.log("Delete result:", deleteResult);
            if (deleteResult) {
                setStatus("unknown");
                return true;
            }
        }
        return false;
    };

    useEffect(() => {
        setSendable(props.files.reduce((acc, curr) => files[curr] ? acc : false, true));
    }, [props.files, files]);

    return (
        <Box className="file-input-action-container">
            {props.template && (
                <Box
                    className="file-input-action"
                    component="a"
                    onClick={handleGetTemplate}
                >
                    <p>Descargar formato</p>
                    <svg width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path id="Vector" d="M8.3002 9.25263C8.3002 9.004 8.09882 8.80263 7.8502 8.80263H6.9502C6.70157 8.80263 6.5002 9.004 6.5002 9.25263V12.403H4.6672C4.26557 12.403 4.06532 12.8894 4.35032 13.1725L7.06195 15.8639C7.24907 16.0495 7.55095 16.0495 7.73807 15.8639L10.4497 13.1725C10.7347 12.8898 10.5344 12.403 10.1328 12.403H8.3002V9.25263ZM14.0688 4.07425L10.9229 0.928752C10.5854 0.591252 10.1279 0.400002 9.65207 0.400002H1.99982C1.00645 0.403752 0.200195 1.21 0.200195 2.20338V17.8004C0.200195 18.7937 1.00645 19.6 1.99982 19.6H12.7976C13.7913 19.6 14.6002 18.7937 14.6002 17.8004V5.34888C14.6002 4.873 14.4063 4.41175 14.0688 4.07425V4.07425ZM9.79832 2.34963L12.6517 5.20263H9.79832V2.34963V2.34963ZM12.8002 17.8004H1.99982V2.20338H7.9987V6.10263C7.9987 6.60138 8.39995 7.00225 8.8987 7.00225H12.8002V17.8004Z" fill="#26323D"/>
                    </svg>
                </Box>
            )}
            {props.files.length > 1
                ? props.files.map((file, index) => <UploadFileAction key={index} name={file} number={index + 1} onChange={handleChange} onRemove={handleRemove} />)
                : <UploadFileAction name={props.files[0]} onChange={handleChange} onRemove={handleRemove} />
            }
            {sendable && <SendFileButton onSend={handleSend} />}
            {statusIcons[status]}
        </Box>
    );
}

export default FileInputAction;
export type { Status };