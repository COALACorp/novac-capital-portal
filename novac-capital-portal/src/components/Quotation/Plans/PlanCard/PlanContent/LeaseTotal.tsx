import Box from "@mui/material/Box";

type LeaseTotalProps = {
    periodMonths: number,
    initalPartialitites: number,
    taxedPartialities: number,
};

function LeaseTotal(props: LeaseTotalProps) {
    return (
        <Box className="lease-total">
            <p className="lease-total-title strong">Valor total de la renta</p>
            <Box className="lease-total-values">
                <Box className="plan-property">
                    <p className="strong">Período:</p>
                    <p>{props.periodMonths} meses</p>
                </Box>
                <Box className="plan-property">
                    <p className="strong">Número de Parcialidades en el Desembolso Inicial:</p>
                    <p>{props.initalPartialitites} meses</p>
                </Box>
                <Box className="plan-property">
                    <p className="strong">Parcialidades c/IVA:</p>
                    <p>{props.taxedPartialities}</p>
                </Box>
            </Box>
        </Box>
    );
}

export default LeaseTotal;