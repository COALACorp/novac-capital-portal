import Box from "@mui/material/Box";

import FileInputAction, { Status } from "./FileInputAction";

type FileInputProps = {
    label: string,
    name: string,
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
                <FileInputAction name={props.name} templateUrl={props.templateUrl} status={props.status} />
            </Box>
        </Box>
    );
}

export default FileInput;