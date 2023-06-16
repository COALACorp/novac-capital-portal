import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import type { ValidatedFormValuesType } from "../DataForm/DataForm";
import PlansHeading from "./PlansHeading";
import PlansCollection from "./PlansCollection";

import "../../../styles/quotation/plans.css";

type PlansProps = {
    form: ValidatedFormValuesType,
};

function Plans(props: PlansProps) {
    return (
        <Box id="plans-container">
            <Box
                id="plans"
            >
                <PlansHeading client={props.form.name} />
                <PlansCollection plans={[12, 18, 24, 36, 48, 60]} onSelection={console.log} />
            </Box>
            <Button id="plans-submit">Continuar</Button>
        </Box>
    );
}

export default Plans;