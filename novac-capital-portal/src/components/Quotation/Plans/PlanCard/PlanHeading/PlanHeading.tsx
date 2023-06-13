import Box from "@mui/material/Box";

import PlanAvatar from "./PlanAvatar";

type PlanHeadingProps = {
    months: number,
};

function PlanHeading(props: PlanHeadingProps) {
    return (
        <Box className="plan-heading">
            <PlanAvatar months={12} />
            <Box className="plan-heading-info">
                <p className="plan-heading-title strong">Plazo a {props.months} meses</p>
                <Box className="plan-heading-info-values">
                    <p><span className="strong">Valor del equipo:</span> $350,000.00</p>
                    <p><span className="strong">Valor del equipo:</span> $350,000.00</p>
                </Box>
            </Box>
        </Box>
    );
}

export default PlanHeading;