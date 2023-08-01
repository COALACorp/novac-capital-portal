type SendFileButtonProps = {
    disabled?: boolean,
    onSend?: () => void,
};

function SendFileButton(props: SendFileButtonProps) {
    const handleSend = () => {
        props.onSend && props.onSend();
    };
    
    return (
        <a className={"file-input-action send-file" + (props.disabled ? " disabled" : "")} onClick={handleSend}>
            <p>Enviar</p>
        </a>
    );
}

export default SendFileButton;