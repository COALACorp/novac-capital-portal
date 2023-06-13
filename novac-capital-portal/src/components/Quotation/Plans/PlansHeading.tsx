import Stack from "@mui/material/Stack";

type PlansHeadingProps = {
    client: string,
};

function PlansHeading(props: PlansHeadingProps) {
    return (
        <Stack id="plans-collection-heading">
            <p>
                <span className="strong">Nombre del cliente:</span> {props.client}
            </p>
            <p>
                <span className="strong">Fecha:</span> {new Date().toUTCString()}
            </p>
        </Stack>
    );
}

export default PlansHeading;