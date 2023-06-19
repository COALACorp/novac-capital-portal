import Box from "@mui/material/Box";

type ExpensesListProps = {
    administrativeExpenses: number,
    firstLastPartiality: number,
    advancePayment: number,
};

function ExpensesList(props: ExpensesListProps) {
    return (
        <Box className="expenses-list">
            <Box className="plan-property">
                <p className="strong">{"(-) Parcialidad Inicial y Última:"}</p>
                <p>${props.firstLastPartiality.toLocaleString()}</p>
            </Box>
            <Box className="plan-property">
                <p className="strong">{"(-) Gastos Administrativos:"}</p>
                <p>${props.administrativeExpenses.toLocaleString()}*</p>
            </Box>
            <Box className="plan-property">
                <p className="strong">{"(-) Anticipo:"}</p>
                <p>${props.advancePayment.toLocaleString()}</p>
            </Box>
        </Box>
    );
}

export default ExpensesList;