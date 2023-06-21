import { useState } from "react";
import Box from "@mui/material/Box";

type FileInputProps = {
    label: string,
    name: string,
};

function FileInput(props: FileInputProps) {
    const [file, setFile] = useState<File>();
    const [fileUrl, setFileUrl] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const t_file = event.target.files[0];
            const t_fileUrl = URL.createObjectURL(t_file);
            setFile(t_file);
            setFileUrl(t_fileUrl);
        }
    };

    return (
        <Box className="file-input-container">
            <label className="file-input-label" htmlFor={props.name}>
                {props.label}
                <input
                    id={props.name}
                    className="file-input"
                    type="file"
                    accept="image/*"
                    name={props.name}
                    onChange={handleChange}
                />
            </label>
            <figure>
                <img className="file-input-preview" src={fileUrl} />
                <figcaption>{file ? `${file.name} - ${file.type}` : ""}</figcaption>
            </figure>
        </Box>
    );
}

export default FileInput;