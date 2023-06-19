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
                    <p><span className="strong">Valor Equipo c/IVA:</span> <b>${props.taxedEquipment.toLocaleString()}.</b></p>
                    <p><span className="strong">Parcialidades c/IVA:</span> <b>${props.taxedPartialities.toLocaleString()}</b></p>
                </Box>
            </Box>
        </Box>
    );
}

export default PlanHeading;