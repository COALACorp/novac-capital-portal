import Box from "@mui/material/Box";

type PlanAvatarProps = {
    months: number,
};

function PlanAvatar(props: PlanAvatarProps) {
    return (
        <Box id="files-plan-avatar">
            <p className="strong">{props.months}</p>
        </Box>
    );
}

export default PlanAvatar;