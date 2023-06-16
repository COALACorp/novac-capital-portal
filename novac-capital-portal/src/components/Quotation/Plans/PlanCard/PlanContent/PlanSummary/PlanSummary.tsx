import Box from "@mui/material/Box";

import PlanExpenses from "./PlanExpenses/PlanExpenses";

type PlanSummaryProps = {
    firstLastPartiality: number,
    administrativeExpenses: number,
    advancePayment: number,
    totalExpenses: number,
};

function PlanSummary(props: PlanSummaryProps) {
    return (
        <Box className="plan-summary">
            <p className="plan-summary-title strong">Resumen</p>
            <PlanExpenses
                firstLastPartiality={props.firstLastPartiality}
                administrativeExpenses={props.administrativeExpenses}
                advancePayment={props.advancePayment}
                totalExpenses={props.totalExpenses}
            />
        </Box>
    );
}

export default PlanSummary;