import Box from "@mui/material/Box";

import PlansHeading from "./PlansHeading";
import PlansCollection from "./PlansCollection";

import "../../../styles/quotation/plans.css";

function Plans() {
    return (
        <Box
            id="plans-container"
        >
            <PlansHeading client="Mario Orellana" />
            <PlansCollection />
        </Box>
    );
}

export default Plans;