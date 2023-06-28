import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import FormHeading from "../FormHeading";
import FilesPlan from "./FilesPlan/FilesPlan";
import ApplicantRequirements from "./ApplicantRequirements";
import EndorsementRequirements from "./EndorsementRequirements";

import "../../styles/filesform.css";

function FilesForm() {
    return (
        <Box id="files-form-container">
            <Box id="files-form">
                <FormHeading title="Checklist" subtitle="This is a subtitle parsed to FormHeading" />
                <FilesPlan
                    months={12}
                    applicant="John Doe"
                    equipment="Test Equipment"
                    taxedEquipment={1350000.00}
                    taxedPartialities={126735.00}
                    status="pending"
                />
                <ApplicantRequirements />
                <EndorsementRequirements />
            </Box>
            <Button id="files-submit">Enviar</Button>
        </Box>
    );
}

export default FilesForm;