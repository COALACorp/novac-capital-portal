import { useState, useEffect } from "react";

import UploadFileButton from "./UploadFileButton";
import RemoveFileButton from "./RemoveFileButton";
import { FileSpec } from "@/data/filesRequirements";

type UploadFileActionProps = {
    file: FileSpec,
    number?: number,
    onChange?: (name: string, file: File|undefined) => void,
    onRemove?: (name: string) => boolean|Promise<boolean>,
};

function UploadFileAction(props: UploadFileActionProps) {
    const [file, setFile] = useState<File>();
    const [uploaded, setUploaded] = useState<string|undefined>();

    const handleChange = (newFile: File|undefined) => {
        setFile(newFile);
    };

    const handleRemove = async () => {
        if (props.file.uploaded
            && props.file.fileName
            && props.onRemove
            && await props.onRemove(props.file.fileName)
        )
            setFile(undefined);
        else
            console.log("Failed to remove file");
    };
    
    useEffect(() => {
        if (props.file.uploaded && props.file.fileName) {
            setFile(undefined);
            setUploaded(props.file.fileName);
        } else if (file)
            setUploaded(file.name);
        else
            setUploaded(undefined);
    }, [props.file, file]);

    useEffect(() => {
        props.onChange && props.onChange(props.file.name, file);
    }, [file]);

    return uploaded
        ? <RemoveFileButton fileName={uploaded} onRemove={handleRemove} />
        : <UploadFileButton name={props.file.name} number={props.number} onChange={handleChange} />;
}

export default UploadFileAction;