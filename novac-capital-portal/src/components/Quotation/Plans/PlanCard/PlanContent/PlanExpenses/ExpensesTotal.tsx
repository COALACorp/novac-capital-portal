import Box from "@mui/material/Box";

type ExpensesTotalProps = {
    totalExpenses: number,
};

function ExpensesTotal(props: ExpensesTotalProps) {
    return (
        <Box className="plan-property expenses-total">
            <p className="strong">Gastos Administrativos:</p>
            <p>{props.totalExpenses}</p>
        </Box>
    );
}

export default ExpensesTotal;