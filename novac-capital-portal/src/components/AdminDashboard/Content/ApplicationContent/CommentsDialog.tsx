import { useState } from "react";
import Image from "next/image";
import Dialog from "@mui/material/Dialog";

type CommentsDialogProps = {
    targetLabel: string,
    open?: boolean,
    onSubmit?: (comments: string) => void,
    onClose?: () => void,
};

function CommentsDialog(props: CommentsDialogProps) {
    const [value, setValue] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(event.currentTarget.value);
    };

    const handleClose = () => {
        setValue("");
        props.onClose && props.onClose();
    };

    const handleSubmit = () => {
        handleClose && handleClose();
        props.onSubmit && props.onSubmit(value);
        setValue("");
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
                    <p>Por favor, deja un comentario sobre porqué rechazas {props.targetLabel}:</p>
                    <textarea id="dialog-input" rows={5} placeholder="Escribe un comentario" autoComplete="off" value={value} onChange={handleChange}></textarea>
                </div>
                <a className={"action" + (value.trim().length === 0 ? " disabled" : "")} onClick={handleSubmit}>
                    <div id="dialog-submit" className="cancel">
                        <p className="strong">Denegar</p>
                    </div>
                </a>
            </div>
        </Dialog>
    );
}

export default CommentsDialog;