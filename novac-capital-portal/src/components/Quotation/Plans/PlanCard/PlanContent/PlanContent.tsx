import Box from "@mui/material/Box";

import LeaseTotal from "./LeaseTotal";
import PlanExpenses from "./PlanExpenses/PlanExpenses";

function PlanContent() {
    return (
        <Box className="plan-content">
            <LeaseTotal periodMonths={10} initalPartialitites={2} taxedPartialities={55906.2} />
            <PlanExpenses />
        </Box>
    );
}

export default PlanContent;