import Stack from "@mui/material/Stack";

import "../../styles/quotation.css";

function Heading() {
    return (
        <Stack id="quotation-header">
            <h1 className="strong">
                Cotiza tu arrendamiento
            </h1>
            <h2>
                This is a subheader located in quotation form
            </h2>
        </Stack>
    );
}

export default Heading;