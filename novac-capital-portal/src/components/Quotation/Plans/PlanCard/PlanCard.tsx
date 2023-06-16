import Box from "@mui/material/Box";

import PlanHeading from "./PlanHeading/PlanHeading";
import PlanContent from "./PlanContent/PlanContent";

type PlanCardProps = {
    key: number,
    months: number,
    equipment: number,
    partialities: number,
    firstLastPartiality: number,
    administrative: number,
    advancePayment: number,
    totalExpenses: number,
    insurance: string,
    selected?: boolean,
    onClick?: (selection: number) => void,
};

function PlanCard(props: PlanCardProps) {
    const handleClick = () => {
        props.onClick && props.onClick(props.months);
    };

    return (
        <a className="plan-card-container" onClick={handleClick}>
            <Box className={"plan-card" + (props.selected ? " selected" : "")}>
                <PlanHeading
                    months={props.months}
                    equipment={props.equipment}
                    partialities={props.partialities}
                />
                <PlanContent
                    firstLastPartiality={props.firstLastPartiality}
                    administrative={props.administrative}
                    advancePayment={props.advancePayment}
                    totalExpenses={props.totalExpenses}
                    insurance={props.insurance}
                />
            </Box>
        </a>
    );
}

export default PlanCard;