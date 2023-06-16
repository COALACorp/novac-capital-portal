import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import Heading from "../Heading";

type PlansHeadingProps = {
    client: string,
};

function PlansHeading(props: PlansHeadingProps) {
    return (
        <Box id="plans-heading-container">
            <Heading />
            <Stack id="plans-collection-heading">
                <p><span className="strong">Nombre del cliente:</span> {props.client}</p>
                <p><span className="strong">Fecha:</span> {new Date().toLocaleDateString("es-MX")}</p>
            </Stack>
        </Box>
    );
}

export default PlansHeading;