import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import "../../styles/quotation/quotation.css";

function Heading() {
    return (
        <Box id="quotation-heading-container">
            <Stack id="quotation-heading">
                <h1 className="strong">
                    Cotiza tu arrendamiento
                </h1>
                <h2>
                    This is a subheader located in quotation form
                </h2>
            </Stack>
        </Box>
    );
}

export default Heading;