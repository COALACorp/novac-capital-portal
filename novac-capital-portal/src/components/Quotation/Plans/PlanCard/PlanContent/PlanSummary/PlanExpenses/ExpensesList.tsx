import Box from "@mui/material/Box";

import ExpensesItem from "./ExpensesItem";

type ExpensesListProps = {
    administrativeExpenses: number,
    firstLastPartiality: number,
    advancePayment: number,
};

function ExpensesList(props: ExpensesListProps) {
    return (
        <Box className="expenses-list">
            <ExpensesItem name="Parcialidad Inicial y Última" amount={props.firstLastPartiality} />
            <ExpensesItem name="Gastos Administrativos" amount={props.administrativeExpenses} />
            <ExpensesItem name="Anticipo" amount={props.advancePayment} />
        </Box>
    );
}

export default ExpensesList;