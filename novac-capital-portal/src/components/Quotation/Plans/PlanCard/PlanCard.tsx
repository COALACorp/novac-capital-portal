import Box from "@mui/material/Box";

import PlanHeading from "./PlanHeading/PlanHeading";
import PlanContent from "./PlanContent/PlanContent";

type PlanCardProps = {
    key: number,
    months: number,
    taxedEquipment: number,
    taxedPartialities: number,
    initialCustomerExpenses: number,
    firstLastPartiality: number,
    signaturesRatification: number,
    openingCommission: number,
    administrativeExpenses: number,
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
                    taxedEquipment={props.taxedEquipment}
                    taxedPartialities={props.taxedPartialities}
                />
                <PlanContent
                    initialCustomerExpenses={props.initialCustomerExpenses}
                    administrativeExpenses={props.administrativeExpenses}
                    signaturesRatification={props.signaturesRatification}
                    openingCommission={props.openingCommission}
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