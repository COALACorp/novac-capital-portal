type SendFileButtonProps = {
    loading?: boolean,
    onSend?: () => void,
};

function SendFileButton(props: SendFileButtonProps) {
    const handleSend = () => {
        props.onSend && props.onSend();
    };
    
    return (
        <a className={"file-input-action send-file" + (props.loading ? " loading" : "")} onClick={handleSend}>
            <p>Enviar</p>
        </a>
    );
}

export default SendFileButton;