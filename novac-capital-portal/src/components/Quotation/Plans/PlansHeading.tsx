import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import FormHeading from "../../FormHeading";

type PlansHeadingProps = {
    client: string,
};

function PlansHeading(props: PlansHeadingProps) {
    return (
        <Box id="plans-heading-container">
            <FormHeading title="Cotiza tu arrendamiento" subtitle="This is a subtitle parsed to FormHeading" />
            <Stack id="plans-collection-heading">
                <p><span className="strong">Nombre del cliente:</span> {props.client}</p>
                <p><span className="strong">Fecha:</span> {new Date().toLocaleDateString("es-MX")}</p>
            </Stack>
        </Box>
    );
}

export default PlansHeading;