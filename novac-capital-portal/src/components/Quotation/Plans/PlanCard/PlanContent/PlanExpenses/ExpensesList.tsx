import Box from "@mui/material/Box";

type ExpensesListProps = {
    administrative?: number,
    folioVerification?: number,
    openingCommission?: number,
    creditBureau?: number,
    equipmentInssurance?: string,
};

function ExpensesList(props: ExpensesListProps) {
    return (
        <Box className="expenses-list">
            <Box className="plan-property">
                <p className="strong">Gastos Administrativos:</p>
                <p>{props.administrative ?? "-"}</p>
            </Box>
            <Box className="plan-property">
                <p className="strong">Gastos por Verificacion de Folio:</p>
                <p>{props.folioVerification ?? "-"}</p>
            </Box>
            <Box className="plan-property">
                <p className="strong">Comision por Apertura:</p>
                <p>{props.openingCommission ?? "-"}</p>
            </Box>
            <Box className="plan-property">
                <p className="strong">Buró de Crédito:</p>
                <p>{props.creditBureau ?? "-"}</p>
            </Box>
            <Box className="plan-property">
                <p className="strong">Seguro del equipo:</p>
                <p>{props.equipmentInssurance ?? "-"}</p>
            </Box>
        </Box>
    );
}

export default ExpensesList;