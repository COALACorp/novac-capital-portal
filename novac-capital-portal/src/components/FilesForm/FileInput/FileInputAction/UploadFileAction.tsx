import { useState, useEffect } from "react";
import { extname } from "path";

import UploadFileButton from "./UploadFileButton";
import RemoveFileButton from "./RemoveFileButton";

type UploadFileActionProps = {
    name: string,
    number?: number,
    onChange?: (name: string, file: File|undefined) => void,
    onRemove?: (name: string) => boolean|Promise<boolean>,
};

function UploadFileAction(props: UploadFileActionProps) {
    const [file, setFile] = useState<File>();

    const handleChange = (newFile: File|undefined) => {
        setFile(newFile);
    };

    const handleRemove = async () => {
        if (file && props.onRemove)
            if (await props.onRemove(props.name + extname(file.name)))
                setFile(undefined);
            else
                console.log("Failed to remove file");
    };
    
    useEffect(() => {
        props.onChange && props.onChange(props.name, file);
    }, [file]);

    return file
        ? <RemoveFileButton file={file} onRemove={handleRemove} />
        : <UploadFileButton name={props.name} number={props.number} onChange={handleChange} />;
}

export default UploadFileAction;