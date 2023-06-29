import Box from "@mui/material/Box";

import PlanHeading from "./PlanHeading/PlanHeading";
import PlanContent from "./PlanContent/PlanContent";

type PlanCardProps = {
    months: number,
    taxedEquipment: number,
    taxedPartialities: number,
    administrativeExpenses: number,
    firstLastPartiality: number,
    advancePayment: number,
    totalExpenses: number,
    insurance: string,
    selected?: boolean,
    onSelect?: (selection: number) => void,
};

function PlanCard(props: PlanCardProps) {
    const handleClick = () => {
        props.onSelect && props.onSelect(props.months);
    };

    return (
        <a className="plan-card-container" onClick={handleClick}>
            <Box className={"plan-card" + (props.selected ? " selected" : "")}>
                <PlanHeading
                    months={props.months}
                    taxedEquipment={props.taxedEquipment}
                    taxedPartialities={props.taxedPartialities}
                />
                <PlanContent
                    administrativeExpenses={props.administrativeExpenses}
                    firstLastPartiality={props.firstLastPartiality}
                    advancePayment={props.advancePayment}
                    totalExpenses={props.totalExpenses}
                    insurance={props.insurance}
                />
            </Box>
        </a>
    );
}

export default PlanCard;