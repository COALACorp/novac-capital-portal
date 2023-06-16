import Box from "@mui/material/Box";

type PlanInsuranceProps = {
    insurance: string,
};

function PlanInsurance(props: PlanInsuranceProps) {
    return (
        <Box className="plan-insurance">
            <Box className="plan-property">
                <p className="strong">{"*Seguro del Equipo:"}</p>
                <p>{props.insurance}</p>
            </Box>
        </Box>
    );
}

export default PlanInsurance;