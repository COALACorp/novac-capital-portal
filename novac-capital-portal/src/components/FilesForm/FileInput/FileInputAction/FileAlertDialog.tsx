import Image from "next/image";
import Dialog from "@mui/material/Dialog";

type FileAlertDialogProps = {
    title: string,
    children: React.ReactNode,
    open?: boolean,
    onClose?: () => void,
};

function FileAlertDialog(props: FileAlertDialogProps) {
    return (
        <Dialog open={!!props.open} onClose={props.onClose}>
            <div id="dialog-container">
                <a id="dialog-header" className="action" onClick={props.onClose}>
                    <p>{props.title}</p>
                    <div id="dialog-close-icon">
                        <Image src="icons/Close.svg" width={14} height={14} alt="" />
                    </div>
                </a>
                <div id="dialog-content">
                    <p>{props.children}</p>
                </div>
                <div id="dialog-actions-container">
                    <a className="action" onClick={props.onClose}>
                        <div id="dialog-submit" className="cancel">
                            <p className="strong">Aceptar</p>
                        </div>
                    </a>
                </div>
            </div>
        </Dialog>
    );
}

export default FileAlertDialog;