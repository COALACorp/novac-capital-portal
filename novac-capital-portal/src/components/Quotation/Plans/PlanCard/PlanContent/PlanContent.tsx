import Box from "@mui/material/Box";

import PlanSummary from "./PlanSummary/PlanSummary";
import PlanInsurance from "./PlanInsurance";

type PlanContentProps = {
    initialCustomerExpenses: number,
    firstLastPartiality: number,
    signaturesRatification: number,
    openingCommission: number,
    administrativeExpenses: number,
    advancePayment: number,
    totalExpenses: number,
    insurance: string,
};

function PlanContent(props: PlanContentProps) {
    return (
        <Box className="plan-content">
            <PlanSummary
                initialCustomerExpenses={props.initialCustomerExpenses}
                administrativeExpenses={props.administrativeExpenses}
                signaturesRatification={props.signaturesRatification}
                openingCommission={props.openingCommission}
                firstLastPartiality={props.firstLastPartiality}
                advancePayment={props.advancePayment}
                totalExpenses={props.totalExpenses}
            />
            <PlanInsurance insurance={props.insurance} />
        </Box>
    );
}

export default PlanContent;