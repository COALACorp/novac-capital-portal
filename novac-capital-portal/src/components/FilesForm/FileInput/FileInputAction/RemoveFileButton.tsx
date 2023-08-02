import { useState } from "react";
import Popover from "@mui/material/Popover";

import { Status, statusIcons } from "../FileInput";

type RemoveFileButtonProps = {
    fileName: string,
    status?: Status,
    disabled?: boolean,
    onRemove?: () => void,
};

function RemoveFileButton(props: RemoveFileButtonProps) {
    const [removeAnchorEl, setRemoveAnchorEl] = useState<HTMLAnchorElement|null>(null);

    const handleClickRemove = (event: React.MouseEvent<HTMLAnchorElement>) => {
        setRemoveAnchorEl(event.currentTarget);
    };

    const handleRemove = () => {
        setRemoveAnchorEl(null);
        props.onRemove && props.onRemove();
    };

    return (
        <>
            <a
                className={"file-input-action" + (props.disabled ? " disabled" : "")}
                aria-describedby={removeAnchorEl ? "remove-file-popover" : undefined}
                onClick={handleClickRemove}
            >
                {props.status && statusIcons[props.status]}
                <p>{props.fileName}</p>
                <div className="status-indicator">
                    <svg width="17" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.2502 16H11.1502C11.2695 16 11.384 15.9526 11.4684 15.8682C11.5528 15.7838 11.6002 15.6693 11.6002 15.55V7.44999C11.6002 7.33065 11.5528 7.21619 11.4684 7.1318C11.384 7.0474 11.2695 6.99999 11.1502 6.99999H10.2502C10.1308 6.99999 10.0164 7.0474 9.932 7.1318C9.84761 7.21619 9.8002 7.33065 9.8002 7.44999V15.55C9.8002 15.6693 9.84761 15.7838 9.932 15.8682C10.0164 15.9526 10.1308 16 10.2502 16ZM16.4002 3.39999H13.3098L12.0348 1.27374C11.8748 1.00712 11.6485 0.786503 11.3778 0.633378C11.1072 0.480252 10.8015 0.399846 10.4906 0.399994H6.70982C6.399 0.399976 6.09347 0.480443 5.82298 0.633563C5.55249 0.786682 5.32626 1.00723 5.16632 1.27374L3.89057 3.39999H0.800195C0.641065 3.39999 0.488453 3.46321 0.375931 3.57573C0.263409 3.68825 0.200195 3.84086 0.200195 3.99999L0.200195 4.59999C0.200195 4.75912 0.263409 4.91174 0.375931 5.02426C0.488453 5.13678 0.641065 5.19999 0.800195 5.19999H1.4002V17.8C1.4002 18.2774 1.58984 18.7352 1.9274 19.0728C2.26497 19.4104 2.72281 19.6 3.2002 19.6H14.0002C14.4776 19.6 14.9354 19.4104 15.273 19.0728C15.6106 18.7352 15.8002 18.2774 15.8002 17.8V5.19999H16.4002C16.5593 5.19999 16.7119 5.13678 16.8245 5.02426C16.937 4.91174 17.0002 4.75912 17.0002 4.59999V3.99999C17.0002 3.84086 16.937 3.68825 16.8245 3.57573C16.7119 3.46321 16.5593 3.39999 16.4002 3.39999ZM6.6442 2.30912C6.66425 2.27574 6.69262 2.24814 6.72654 2.22901C6.76046 2.20988 6.79876 2.19988 6.8377 2.19999H10.3627C10.4016 2.19995 10.4398 2.20998 10.4736 2.2291C10.5075 2.24823 10.5358 2.2758 10.5558 2.30912L11.2106 3.39999H5.98982L6.6442 2.30912ZM14.0002 17.8H3.2002V5.19999H14.0002V17.8ZM6.0502 16H6.9502C7.06954 16 7.184 15.9526 7.26839 15.8682C7.35278 15.7838 7.4002 15.6693 7.4002 15.55V7.44999C7.4002 7.33065 7.35278 7.21619 7.26839 7.1318C7.184 7.0474 7.06954 6.99999 6.9502 6.99999H6.0502C5.93085 6.99999 5.81639 7.0474 5.732 7.1318C5.64761 7.21619 5.6002 7.33065 5.6002 7.44999V15.55C5.6002 15.6693 5.64761 15.7838 5.732 15.8682C5.81639 15.9526 5.93085 16 6.0502 16Z" fill="#EB5757"/>
                    </svg>
                </div>
            </a>
            <Popover
                id={removeAnchorEl ? "remove-file-popover" : undefined}
                open={Boolean(removeAnchorEl)}
                anchorEl={removeAnchorEl}
                onClose={() => setRemoveAnchorEl(null)}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
            >
                <div className="file-remove-action">
                    <div>
                        <p>Estás seguro que quieres eliminar</p>
                        <p>&quot;{props.fileName}&quot;?</p>
                    </div>
                    <div className="file-input-action-container">
                        <a
                            className="file-input-action"
                            onClick={handleRemove}
                        >
                            <p>Si</p>
                        </a>
                        <a
                            className="file-input-action"
                            onClick={() => setRemoveAnchorEl(null)}
                        >
                            <p>No</p>
                        </a>
                    </div>
                </div>
            </Popover>
        </>
    );
}

export default RemoveFileButton;