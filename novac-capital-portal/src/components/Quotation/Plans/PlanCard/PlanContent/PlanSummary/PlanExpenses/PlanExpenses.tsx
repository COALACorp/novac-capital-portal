import Box from "@mui/material/Box";

import ExpensesList from "./ExpensesList";
import ExpensesTotal from "./ExpensesTotal";

type PlanExpensesProps = {
    administrativeExpenses: number,
    firstLastPartiality: number,
    advancePayment: number,
    totalExpenses: number,
};

function PlanExpenses(props: PlanExpensesProps) {
    return (
        <Box className="plan-expenses">
            <ExpensesList
                administrativeExpenses={props.administrativeExpenses}
                firstLastPartiality={props.firstLastPartiality}
                advancePayment={props.advancePayment}
            />
            <ExpensesTotal totalExpenses={props.totalExpenses} />
        </Box>
    );
}

export default PlanExpenses;