import Box from "@mui/material/Box";

import FormHeading from "../FormHeading";
import FilesPlan from "./FilesPlan/FilesPlan";
import type { Status } from "./FilesPlan/FilesPlanStatus";

type FilesFormHeadProps = {
    months: number,
    applicant: string,
    taxedEquipment: number,
    taxedPartialities: number,
    status: Status,
};

function FilesFormHead(props: FilesFormHeadProps) {
    return (
        <Box id="files-form-heading-container">
            <FormHeading title="Checklist" subtitle="This is a subtitle parsed to FormHeading" />
            <FilesPlan
                months={props.months}
                applicant={props.applicant}
                taxedEquipment={props.taxedEquipment}
                taxedPartialities={props.taxedPartialities}
                status={props.status}
            />
        </Box>
    );
}

export default FilesFormHead;