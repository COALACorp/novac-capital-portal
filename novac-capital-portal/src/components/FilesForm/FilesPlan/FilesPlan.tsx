import Box from "@mui/material/Box";

import PlanAvatar from "./PlanAvatar";
import FilesPlanStatus, { Status } from "./FilesPlanStatus";

type FilesPlanProps = {
    months: number,
    applicant: string,
    equipment: string,
    taxedEquipment: number,
    taxedPartialities: number,
    status: Status,
};

function FilesPlan(props: FilesPlanProps) {
    return (
        <Box id="files-plan">
            <Box id="files-plan-applicant">
                <PlanAvatar months={props.months} />
                <Box id="files-plan-applicant-info">
                    <p className="plan-data strong">{props.applicant}</p>
                    <p className="plan-data strong">Plazo a {props.months} meses</p>
                    <p className="plan-value"><span className="strong">Nombre de equipo:</span> {props.equipment}</p>
                </Box>
            </Box>
            <Box id="files-plan-expenses">
                <FilesPlanStatus status={props.status} />
                <p className="plan-value"><span className="strong">Valor Equipo c/IVA:</span> ${props.taxedEquipment.toLocaleString()}</p>
                <p className="plan-value strong">Parcialidades c/IVA: ${props.taxedPartialities.toLocaleString()}</p>
            </Box>
        </Box>
    );
}

export default FilesPlan;