type SendFileButtonProps = {
    onSend?: () => void,
};

function SendFileButton(props: SendFileButtonProps) {
    const handleSend = () => {
        props.onSend && props.onSend();
    };
    
    return (
        <a className="file-input-action send-file" onClick={handleSend}>
            <p>Enviar</p>
        </a>
    );
}

export default SendFileButton;