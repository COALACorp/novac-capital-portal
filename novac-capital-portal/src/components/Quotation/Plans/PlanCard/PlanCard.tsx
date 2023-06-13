import Box from "@mui/material/Box";

import PlanHeading from "./PlanHeading/PlanHeading";
import PlanContent from "./PlanContent/PlanContent";

function PlanCard() {
    return (
        <Box className="plan-card">
            <PlanHeading months={12} />
            <PlanContent />
        </Box>
    );
}

export default PlanCard;