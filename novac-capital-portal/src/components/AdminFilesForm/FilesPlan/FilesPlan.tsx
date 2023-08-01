import PlanAvatar from "./PlanAvatar";
import FilesPlanStatus, { Status } from "./FilesPlanStatus";

type FilesPlanProps = {
    months: number,
    applicant: string,
    taxedPartialities: number,
    status: Status,
};

function FilesPlan(props: FilesPlanProps) {
    return (
        <div id="files-plan">
            <div id="files-plan-info">
                <PlanAvatar months={props.months} />
                <div id="files-plan-info-data">
                    <p className="plan-data strong">{props.applicant}</p>
                    <p className="plan-data strong">Plazo a {props.months} meses</p>
                </div>
            </div>
            <p className="plan-data strong">Parcialidades c/IVA: ${props.taxedPartialities.toLocaleString()}</p>
            <FilesPlanStatus status={props.status} />
        </div>
    );
}

export default FilesPlan;