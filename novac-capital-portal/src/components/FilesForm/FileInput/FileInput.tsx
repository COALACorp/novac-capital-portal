import Box from "@mui/material/Box";

import FileInputAction, { Status } from "./FileInputAction/FileInputAction";

type FileInputProps = {
    label: string,
    files: string[],
    templateUrl?: string,
    status?: Status,
};

function FileInput(props: FileInputProps) {
    return (
        <Box className="file-input-container">
            <Box className="file-input">
                <Box className="file-input-label-container">
                    <p className="file-input-label strong">{props.label}</p>
                </Box>
                <FileInputAction files={props.files} templateUrl={props.templateUrl} status={props.status} />
            </Box>
        </Box>
    );
}

export default FileInput;