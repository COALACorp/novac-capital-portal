import Box from "@mui/material/Box";

type SendFileButtonProps = {
    onSend?: () => void,
};

function SendFileButton(props: SendFileButtonProps) {
    const handleSend = () => {
        props.onSend && props.onSend();
    };
    
    return (
        <Box className="file-input-action send-file" component="a" onClick={handleSend}>
            <p>Enviar</p>
        </Box>
    );
}

export default SendFileButton;