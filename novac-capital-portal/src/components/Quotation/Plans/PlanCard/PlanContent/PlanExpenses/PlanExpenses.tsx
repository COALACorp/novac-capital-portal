import Box from "@mui/material/Box";

import ExpensesList from "./ExpensesList";
import ExpensesTotal from "./ExpensesTotal";

type PlanExpensesProps = {
    firstLastPartiality: number,
    administrative: number,
    advancePayment: number,
    totalExpenses: number,
};

function PlanExpenses(props: PlanExpensesProps) {
    return (
        <Box className="plan-expenses">
            <ExpensesList
                firstLastPartiality={props.firstLastPartiality}
                administrative={props.administrative}
                advancePayment={props.advancePayment}
            />
            <ExpensesTotal totalExpenses={props.totalExpenses} />
        </Box>
    );
}

export default PlanExpenses;