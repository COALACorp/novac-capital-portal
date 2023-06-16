import Box from "@mui/material/Box";

type ExpensesTotalProps = {
    totalExpenses: number,
};

function ExpensesTotal(props: ExpensesTotalProps) {
    return (
        <Box className="expenses-total-container">
            <Box className="expenses-total">
                <Box className="plan-property">
                    <p className="strong">TOTAL Desembolso Inicial:</p>
                    <p>${props.totalExpenses.toLocaleString()}</p>
                </Box>
            </Box>
        </Box>
    );
}

export default ExpensesTotal;