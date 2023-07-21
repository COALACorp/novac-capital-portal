import Box from "@mui/material/Box";

import FileInput from "./FileInput/FileInput";
import { RequirementSpec } from "./FilesForm";

type RequirementsSectionProps = {
    title: string,
    requirements: RequirementSpec[],
    onChange?: (name: string, value: File|undefined) => void,
};

function RequirementsSection(props: RequirementsSectionProps) {
    return (
        <Box className="requirements-container">
            <p className="requirements-title strong">{props.title}</p>
            <Box className="requirements-list">
                {props.requirements.map((requirement, index) => (
                    <FileInput
                        key={index}
                        label={requirement.label}
                        requirement={requirement}
                        template={requirement.template || undefined}
                        onChange={props.onChange}
                    />
                ))}
            </Box>
        </Box>
    );
}

export default RequirementsSection;