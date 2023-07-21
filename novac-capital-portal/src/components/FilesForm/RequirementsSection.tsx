import Box from "@mui/material/Box";

type RequirementsSectionProps = {
    title: string,
    children?: React.ReactNode|React.ReactNode[];
};

function RequirementsSection(props: RequirementsSectionProps) {
    return (
        <Box className="requirements-container">
            <p className="requirements-title strong">{props.title}</p>
            <Box className="requirements-list">
                {props.children}
            </Box>
        </Box>
    );
}

export default RequirementsSection;