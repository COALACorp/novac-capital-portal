import Image from 'next/image';
import Dialog from '@mui/material/Dialog';

type ApproveDialogProps = {
    targetLabel: string,
    open?: boolean,
    onSubmit?: () => void,
    onClose?: () => void,
};

function ApproveDialog(props: ApproveDialogProps) {
    const handleSubmit = () => {
        props.onClose && props.onClose();
        props.onSubmit && props.onSubmit();
    };

    return (
        <Dialog open={!!props.open} onClose={props.onClose}>
            <div id="dialog-container">
                <a id="dialog-header" className="action" onClick={props.onClose}>
                    <p>Aprobar</p>
                    <div id="dialog-close-icon">
                        <Image src="icons/Close.svg" width={14} height={14} alt="" />
                    </div>
                </a>
                <div id="dialog-content">
                    <p>Estás seguro que quieres aprobar {props.targetLabel}?</p>
                </div>
                <div id="dialog-actions-container">
                    <a className="action" onClick={handleSubmit}>
                        <div id="dialog-submit" className="accept">
                            <p className="strong">Aceptar</p>
                        </div>
                    </a>
                    <a className="action" onClick={props.onClose}>
                        <div id="dialog-submit" className="cancel">
                            <p className="strong">Cancelar</p>
                        </div>
                    </a>
                </div>
            </div>
        </Dialog>
    );
}

export default ApproveDialog;