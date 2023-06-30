import Box from "@mui/material/Box";

import PlanExpenses from "./PlanExpenses/PlanExpenses";

type PlanSummaryProps = {
    administrativeExpenses: number,
    firstLastPartiality: number,
    advancePayment: number,
    totalExpenses: number,
};

function PlanSummary(props: PlanSummaryProps) {
    return (
        <Box className="plan-summary">
            <p className="plan-summary-title strong">Resumen</p>
            <PlanExpenses
                administrativeExpenses={props.administrativeExpenses}
                firstLastPartiality={props.firstLastPartiality}
                advancePayment={props.advancePayment}
                totalExpenses={props.totalExpenses}
            />
        </Box>
    );
}

export default PlanSummary;