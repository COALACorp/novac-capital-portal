import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ErrorIcon from "@mui/icons-material/Error";

import UploadFileAction from "./FileInputAction/UploadFileAction";
import SendFileButton from "./FileInputAction/SendFileButton";
import { Template } from "@/utils/docsApi";
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
    requirement: RequirementSpec,
    onChange?: (name: string, value: File|undefined) => void,
    onUpload?: (files: SelectedFile) => void,
    onRemove?: (name: string) => boolean|Promise<boolean>,
};

function FileInput(props: FileInputProps) {
    const [files, setFiles] = useState<SelectedFile>({});
    const [sendable, setSendable] = useState(false);

    const handleGetTemplate = async () => {
        if (props.requirement.template) {
            const template = await Template(props.requirement.template);
            if (template)
                window.open(template.url, "_blank", "noreferrer");
        }
    };

    const handleChange = (name: string, value: File|undefined) => {
        const newFiles = { ...files };
        newFiles[name] = value;
        setFiles(newFiles);
    };

    const handleUpload = () => {
        props.onUpload && props.onUpload(files);
    };

    useEffect(() => {
        setSendable(props.requirement.files.reduce((acc, curr) => files[curr.name] ? acc : false, true));
    }, [files, props.requirement.files]);

    return (
        <Box className="file-input-container">
            <Box className="file-input">
                <Box className="file-input-label-container">
                    <p className="file-input-label strong">{props.requirement.label}</p>
                </Box>
                <Box className="file-input-action-container">
                    {props.requirement.template && (
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
                    {props.requirement.files.map((file, index, files) => (
                        <UploadFileAction
                            key={index}
                            file={file}
                            number={(files.length > 1) ? (index + 1) : undefined}
                            onChange={handleChange}
                            onRemove={props.onRemove}
                        />
                    ))}
                    {sendable && <SendFileButton onSend={handleUpload} />}
                    {statusIcons["unknown"]}
                </Box>
            </Box>
        </Box>
    );
}

export default FileInput;
export type { Status, SelectedFile };