import ApplicationFile from "./ApplicationFile";
import { ApplicationFullData, CreateDocumentFeedback } from "@/utils/api";
import { RequirementsState, RequirementSpec } from "@/data/filesRequirements";
import { Status } from "./ApplicationContent";

type ApplicationFilesSectionProps = {
    application: ApplicationFullData,
    requirements?: RequirementsState,
    onUpdate?: () => void,
};

function ApplicationFilesSection(props: ApplicationFilesSectionProps) {
    const handleFileApproval = async (name: string) => {
        const file = props.application?.documents.find(doc => doc.name === name);
        if (file)
            await CreateDocumentFeedback(file.id, true);
        else
            console.log("Feedback not sent: Could not find document with name:", name);
        props.onUpdate && props.onUpdate();
    };

    const handleFileDenial = async (name: string, comments: string) => {
        const file = props.application?.documents.find(doc => doc.name === name);
        if (file)
            await CreateDocumentFeedback(file.id, false, comments);
        else
            console.log("Feedback not sent: Could not find document with name:", name);
            props.onUpdate && props.onUpdate();
    };

    const getValidFiles = (reqs: RequirementSpec[]): RequirementSpec[] => {
        return reqs.filter(req => (
            req.files.find(file => file.uploaded === true) !== undefined
        ));
    };

    const getStatus = ({ files }: RequirementSpec): Status => {
        const t_files = files;
        if (t_files.find(file => file.status === "pending"))
            return "pending";
        else if (t_files.find(file => file.status === "denied"))
            return "denied";
        else if (t_files.every(file => file.status === "accepted"))
            return "accepted";
        else
            return "pending";
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>DOCUMENTOS CARGADOS</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <p className="strong">Requisitos del solicitante</p>
                    </td>
                </tr>
                {props.requirements && getValidFiles(props.requirements.applicantFiles).map((requirement, index) => (
                    <ApplicationFile
                        key={index}
                        application={props.application}
                        name={requirement.label}
                        files={requirement.files}
                        status={getStatus(requirement)}
                        onAccept={handleFileApproval}
                        onDeny={handleFileDenial}
                    />
                ))}
                <tr>
                    <td>
                        <p className="strong">Requisitos del Aval</p>
                    </td>
                </tr>
                {props.requirements && getValidFiles(props.requirements.endorsementFiles).map((requirement, index) => (
                    <ApplicationFile
                        key={index}
                        application={props.application}
                        name={requirement.label}
                        files={requirement.files}
                        status={getStatus(requirement)}
                        onAccept={handleFileApproval}
                        onDeny={handleFileDenial}
                    />
                ))}
            </tbody>
        </table>
    );
}

export default ApplicationFilesSection;