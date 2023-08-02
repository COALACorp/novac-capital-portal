import FormHeading from "../FormHeading";
import FilesPlan from "./FilesPlan/FilesPlan";
import type { Status } from "./FilesPlan/FilesPlanStatus";

type FilesFormHeadProps = {
    uid: string,
    applicationId: string,
    months: number,
    applicant: string,
    taxedPartialities: number,
    status: Status,
};

function FilesFormHead(props: FilesFormHeadProps) {
    return (
        <div id="files-form-heading-container">
            <FormHeading title={"Aplicación " + props.uid + " / " + props.applicationId} subtitle="This is a subtitle parsed to FormHeading" />
            <FilesPlan
                months={props.months}
                applicant={props.applicant}
                taxedPartialities={props.taxedPartialities}
                status={props.status}
            />
        </div>
    );
}

export default FilesFormHead;