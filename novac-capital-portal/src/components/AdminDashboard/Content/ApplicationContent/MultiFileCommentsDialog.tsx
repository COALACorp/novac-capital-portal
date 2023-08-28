import { useState } from "react";
import Image from "next/image";
import Dialog from "@mui/material/Dialog";

import { FileSpec } from "@/data/filesRequirements";

type CommentsState = {
    [key: string]: {
        selected: boolean,
        value: string,
    },
};

type FileComment = {
    fileName: string,
    comment: string,
};

type MultiFileCommentsDialogProps = {
    files: FileSpec[],
    targetLabel: string,
    open?: boolean,
    onSubmit?: (comments: FileComment[]) => void,
    onClose?: () => void,
};

function MultiFileCommentsDialog(props: MultiFileCommentsDialogProps) {
    const [comments, setComments] = useState<CommentsState>({});

    const handleSelection = (fileName: string) => {
        const newComments = { ...comments };
        const currentComment = newComments[fileName];
        newComments[fileName] = {
            selected: !currentComment?.selected,
            value: currentComment?.value,
        };
        setComments(newComments);
    };

    const handleChange = (fileName: string, inputValue: string) => {
        const newComments = { ...comments };
        const currentComment = newComments[fileName];
        newComments[fileName] = {
            selected: currentComment.selected,
            value: inputValue,
        };
        setComments(newComments);
    };

    const handleClose = () => {
        setComments({});
        props.onClose && props.onClose();
    };

    const handleSubmit = () => {
        const toSend: FileComment[] = Object.keys(comments).filter(fileName => comments[fileName].selected).map(fileName => ({ fileName, comment: comments[fileName].value}));
        handleClose && handleClose();
        console.log("Submitted value:", toSend);
        props.onSubmit && props.onSubmit(toSend);
    };

    return (
        <Dialog open={!!props.open} onClose={handleClose}>
            <div id="dialog-container">
                <a id="dialog-header" className="action" onClick={handleClose}>
                    <p>Denegar</p>
                    <div id="dialog-close-icon">
                        <Image src="icons/Close.svg" width={14} height={14} alt="" />
                    </div>
                </a>
                <div id="dialog-content">
                    <p>Por favor, selecciona los archivos que deseas denegar:</p>
                </div>
                <div className="dialog-files-feedback-container">
                    {props.files.map((file, index) => file.fileName && (
                        <div key={index} className="file-feedback-container">
                            <a
                                key={index}
                                className={"dialog-file-option action" + (comments[file.fileName]?.selected ? " selected" : "")}
                                onClick={() => handleSelection(file.fileName ?? "")}
                            >
                                <p className="file-name">{file.displayName}</p>
                            </a>
                            <div id="dialog-content" className={!comments[file.fileName]?.selected ? "hidden" : ""}>
                                <p>Por favor, deja un comentario sobre porqué rechazas el archivo {file.displayName}:</p>
                                <textarea
                                    id="dialog-input"
                                    rows={5}
                                    placeholder="Escribe un comentario"
                                    autoComplete="off"
                                    value={comments[file.fileName]?.value}
                                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => file.fileName && handleChange(file.fileName, event.currentTarget.value)}
                                ></textarea>
                            </div>
                        </div>
                    ))}
                </div>
                <a className="action" onClick={handleSubmit}>
                    <div id="dialog-submit" className="cancel">
                        <p className="strong">Denegar</p>
                    </div>
                </a>
            </div>
        </Dialog>
    );
}

export default MultiFileCommentsDialog;
export type { FileComment };