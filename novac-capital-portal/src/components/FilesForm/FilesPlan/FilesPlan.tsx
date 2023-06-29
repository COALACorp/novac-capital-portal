import Box from "@mui/material/Box";

import PlanAvatar from "./PlanAvatar";
import FilesPlanStatus, { Status } from "./FilesPlanStatus";

type FilesPlanProps = {
    months: number,
    applicant: string,
    taxedEquipment: number,
    taxedPartialities: number,
    status: Status,
};

function FilesPlan(props: FilesPlanProps) {
    return (
        <Box id="files-plan">
            <Box id="files-plan-info">
                <PlanAvatar months={props.months} />
                <Box id="files-plan-info-data">
                    <p className="plan-data strong">{props.applicant}</p>
                    <p className="plan-data strong">Plazo a {props.months} meses</p>
                </Box>
            </Box>
            <p className="plan-data strong">Parcialidades c/IVA: ${props.taxedPartialities.toLocaleString()}</p>
            <FilesPlanStatus status={props.status} />
        </Box>
    );
}

export default FilesPlan;