import { useState, useEffect } from "react";

import UploadFileButton from "./UploadFileButton";
import RemoveFileButton from "./RemoveFileButton";
import SendFileButton from "./SendFileButton";

type UploadFileActionProps = {
    name: string,
    onChange?: (name: string, file: File|undefined) => void,
    onUpload?: (name: string, file: File) => void,
    onRemove?: (name: string) => void,
};

function UploadFileAction(props: UploadFileActionProps) {
    const [file, setFile] = useState<File>();
    const [sent, setSent] = useState(false);

    const handleChange = (newFile: File|undefined) => {
        setFile(newFile);
        if (newFile)
            setSent(false);
    };

    const handleRemove = () => {
        setFile(undefined);
        props.onRemove && props.onRemove(props.name);
    };

    const handleSend = () => {
        if (file) {
            props.onUpload && props.onUpload(props.name, file);
            setSent(true);
        }
    };
    
    useEffect(() => {
        props.onChange && props.onChange(props.name, file);
    }, [file]);

    return file ? (
        <>
            <RemoveFileButton file={file} onRemove={handleRemove} />
            {sent || <SendFileButton onSend={handleSend} />}
        </>
    ) : <UploadFileButton name={props.name} onChange={handleChange} />;
}

export default UploadFileAction;