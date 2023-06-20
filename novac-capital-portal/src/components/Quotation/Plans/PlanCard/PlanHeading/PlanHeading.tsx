import Box from "@mui/material/Box";

import PlanAvatar from "./PlanAvatar";

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
                <Box className="plan-heading-info-values">
                    <p>Valor Equipo c/IVA: ${props.taxedEquipment.toLocaleString()}</p>
                    <p className="strong">Parcialidades c/IVA: ${props.taxedPartialities.toLocaleString()}</p>
                </Box>
            </Box>
        </Box>
    );
}

export default PlanHeading;