import { useState, useEffect } from "react";

import UploadFileButton from "./UploadFileButton";
import RemoveFileButton from "./RemoveFileButton";

type UploadFileActionProps = {
    name: string,
    number?: number,
    onChange?: (name: string, file: File|undefined) => void,
    onUpload?: (name: string, file: File) => void,
    onRemove?: (name: string) => void,
};

function UploadFileAction(props: UploadFileActionProps) {
    const [file, setFile] = useState<File>();
    const [sending, setSending] = useState(false);

    const handleChange = (newFile: File|undefined) => {
        setFile(newFile);
    };

    const handleRemove = () => {
        setFile(undefined);
        props.onRemove && props.onRemove(props.name);
    };
    
    useEffect(() => {
        if (file) {
            setSending(true);
            props.onUpload && props.onUpload(props.name, file);

            setTimeout(() => {
                setSending(false);
            }, 2000);
        }
        props.onChange && props.onChange(props.name, file);
    }, [file]);

    return file
        ? <RemoveFileButton file={file} onRemove={handleRemove} loading={sending} />
        : <UploadFileButton name={props.name} number={props.number} onChange={handleChange} />;
}

export default UploadFileAction;