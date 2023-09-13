import { useState, useEffect } from "react";

import UploadFileButton from "./UploadFileButton";
import RemoveFileButton from "./RemoveFileButton";
import { FileSpec } from "@/data/filesRequirements";
import { Status } from "../FileInput";

type UploadFileActionProps = {
    file: FileSpec,
    number?: number,
    status?: Status,
    disabled?: boolean,
    onChange?: (name: string, file: File|undefined) => void,
    onRemove?: (name: string) => boolean|Promise<boolean>,
};

function UploadFileAction(props: UploadFileActionProps) {
    // const MAX_FILE_SIZE = Number(process.env.NEXT_PUBLIC_MAX_FILE_SIZE_MB) * 1048576;
    const [file, setFile] = useState<File>();
    const [uploaded, setUploaded] = useState<string|undefined>();
    const [loading, setLoading] = useState(false);

    const handleChange = (newFile: File|undefined) => {
        // if (newFile && newFile.size > MAX_FILE_SIZE) {
        //     console.log(`File too large: ${newFile.size / 1048576}MB`);
        // }
        setFile(newFile);
    };

    const handleRemove = async () => {
        setLoading(true);
        if (
            (props.file.uploaded
                && props.file.fileName
                && props.onRemove
                && await props.onRemove(props.file.fileName)
            ) || file
        )
            setFile(undefined);
        else
            console.log("Failed to remove file");
        setLoading(false);
    };
    
    useEffect(() => {
        if (props.file.uploaded && props.file.displayName) {
            setFile(undefined);
            setUploaded(props.file.displayName);
        } else if (file)
            setUploaded(file.name);
        else
            setUploaded(undefined);
    }, [props.file, file]);

    useEffect(() => {
        props.onChange && props.onChange(props.file.name, file);
    }, [file]);

    return uploaded
        ? <RemoveFileButton fileName={uploaded} status={props.status} onRemove={handleRemove} disabled={props.disabled || loading} />
        : <UploadFileButton name={props.file.name} number={props.number} onChange={handleChange} />;
}

export default UploadFileAction;