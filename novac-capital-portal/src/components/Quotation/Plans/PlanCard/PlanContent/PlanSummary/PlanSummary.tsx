import Box from "@mui/material/Box";

import PlanExpenses from "./PlanExpenses/PlanExpenses";

type PlanSummaryProps = {
    initialCustomerExpenses: number,
    firstLastPartiality: number,
    signaturesRatification: number,
    openingCommission: number,
    administrativeExpenses: number,
    advancePayment: number,
    totalExpenses: number,
};

function PlanSummary(props: PlanSummaryProps) {
    return (
        <Box className="plan-summary">
            <p className="plan-summary-title strong">Resumen</p>
            <PlanExpenses
                initialCustomerExpenses={props.initialCustomerExpenses}
                administrativeExpenses={props.administrativeExpenses}
                signaturesRatification={props.signaturesRatification}
                openingCommission={props.openingCommission}
                firstLastPartiality={props.firstLastPartiality}
                advancePayment={props.advancePayment}
                totalExpenses={props.totalExpenses}
            />
        </Box>
    );
}

export default PlanSummary;