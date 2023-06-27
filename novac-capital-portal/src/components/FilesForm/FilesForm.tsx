import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import FormHeading from "../FormHeading";
import PlanHeading from "./FilesPlan/FilesPlan";
import ApplicantRequirements from "./ApplicantRequirements";
import EndorsementRequirements from "./EndorsementRequirements";

import "../../styles/filesform.css";

function FilesForm() {
    return (
        <Box id="files-form-container">
            <Box id="files-form">
                <FormHeading title="Checklist" subtitle="This is a subtitle parsed to FormHeading" />
                <PlanHeading
                    months={12}
                    applicant="John Doe"
                    equipment="Test Equipment"
                    taxedEquipment={1350000.00}
                />
                <ApplicantRequirements />
                <EndorsementRequirements />
            </Box>
            <Button id="files-submit">Continuar</Button>
        </Box>
    );
}

export default FilesForm;