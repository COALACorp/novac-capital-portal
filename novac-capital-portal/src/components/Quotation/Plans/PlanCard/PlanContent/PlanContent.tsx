import Box from "@mui/material/Box";

import PlanSummary from "./PlanSummary/PlanSummary";
import PlanInsurance from "./PlanInsurance";

type PlanContentProps = {
    firstLastPartiality: number,
    administrative: number,
    advancePayment: number,
    totalExpenses: number,
    insurance: string,
};

function PlanContent(props: PlanContentProps) {
    return (
        <Box className="plan-content">
            <PlanSummary
                firstLastPartiality={props.firstLastPartiality}
                administrative={props.administrative}
                advancePayment={props.advancePayment}
                totalExpenses={props.totalExpenses}
            />
            <PlanInsurance insurance={props.insurance} />
        </Box>
    );
}

export default PlanContent;