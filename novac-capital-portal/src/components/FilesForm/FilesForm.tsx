import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import FilesFormHead from "./FilesFormHead";
import ApplicantRequirements from "./ApplicantRequirements";
import EndorsementRequirements from "./EndorsementRequirements";

import "../../styles/filesform.css";

function FilesForm() {
    return (
        <Box id="files-form-container">
            <FilesFormHead
                months={12}
                applicant="John Doe"
                taxedEquipment={123456789}
                taxedPartialities={123456}
                status="pending"
            />
            <ApplicantRequirements />
            <EndorsementRequirements />
            <Button id="files-form-submit">Enviar</Button>
        </Box>
    );
}

export default FilesForm;