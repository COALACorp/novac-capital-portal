import Box from "@mui/material/Box";

import PlanAvatar from "./PlanAvatar";
import PlanHeadingItem from "./PlanHeadingItem";

type PlanHeadingProps = {
    months: number,
    taxedEquipment: number,
    taxedPartialities: number,
};

function PlanHeading(props: PlanHeadingProps) {
    return (
        <Box className="plan-heading">
            <PlanAvatar months={props.months} />
            <Box className="plan-heading-info">
                <p className="plan-heading-title strong">Plazo a {props.months} meses</p>
                <Box className="plan-heading-info-item-container">
                    <PlanHeadingItem name="Valor del equipo c/IVA" amount={props.taxedEquipment} />
                    <PlanHeadingItem name="Parcialidades c/IVA" amount={props.taxedPartialities} bold />
                </Box>
            </Box>
        </Box>
    );
}

export default PlanHeading;