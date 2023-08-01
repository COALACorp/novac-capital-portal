type PlanAvatarProps = {
    months: number,
};

function PlanAvatar(props: PlanAvatarProps) {
    return (
        <div id="files-plan-avatar">
            <p className="strong">{props.months}</p>
        </div>
    );
}

export default PlanAvatar;