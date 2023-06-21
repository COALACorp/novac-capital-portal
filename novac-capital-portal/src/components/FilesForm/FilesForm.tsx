import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import FileInput from "./FileInput";

import "../../styles/filesform.css";

function FilesForm() {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const file = data.get("file") as File;
        console.log("File data:", file);
    };

    return (
        <Box id="files-form-container">
            <h1>This is the files form window</h1>
            <Box
                id="files-form"
                component="form"
                onSubmit={handleSubmit}
            >
                <FileInput label="Upload a file" name="file" />
                <Button type="submit" variant="contained">Submit</Button>
            </Box>
        </Box>
    );
}

export default FilesForm;