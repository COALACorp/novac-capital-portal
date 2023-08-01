type RequirementsSectionProps = {
    title: string,
    children?: React.ReactNode|React.ReactNode[];
};

function RequirementsSection(props: RequirementsSectionProps) {
    return (
        <div className="requirements-container">
            <p className="requirements-title strong">{props.title}</p>
            <div className="requirements-list">
                {props.children}
            </div>
        </div>
    );
}

export default RequirementsSection;