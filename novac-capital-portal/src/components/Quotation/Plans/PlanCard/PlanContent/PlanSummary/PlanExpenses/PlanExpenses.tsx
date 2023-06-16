import Box from "@mui/material/Box";

import ExpensesList from "./ExpensesList";
import ExpensesTotal from "./ExpensesTotal";

type PlanExpensesProps = {
    firstLastPartiality: number,
    administrativeExpenses: number,
    advancePayment: number,
    totalExpenses: number,
};

function PlanExpenses(props: PlanExpensesProps) {
    return (
        <Box className="plan-expenses">
            <ExpensesList
                firstLastPartiality={props.firstLastPartiality}
                administrativeExpenses={props.administrativeExpenses}
                advancePayment={props.advancePayment}
            />
            <ExpensesTotal totalExpenses={props.totalExpenses} />
        </Box>
    );
}

export default PlanExpenses;