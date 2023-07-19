import Box from "@mui/material/Box";

import FileInputAction, { Status } from "./FileInputAction/FileInputAction";

type FileInputProps = {
    label: string,
    files: string[],
    template?: string,
    status?: Status,
};

function FileInput(props: FileInputProps) {
    return (
        <Box className="file-input-container">
            <Box className="file-input">
                <Box className="file-input-label-container">
                    <p className="file-input-label strong">{props.label}</p>
                </Box>
                <FileInputAction files={props.files} template={props.template} status={props.status} />
            </Box>
        </Box>
    );
}

export default FileInput;