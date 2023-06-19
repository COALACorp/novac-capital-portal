import Box from "@mui/material/Box";

import ExpensesList from "./ExpensesList";
import ExpensesTotal from "./ExpensesTotal";

type PlanExpensesProps = {
    initialCustomerExpenses: number,
    firstLastPartiality: number,
    signaturesRatification: number,
    openingCommission: number,
    administrativeExpenses: number,
    advancePayment: number,
    totalExpenses: number,
};

function PlanExpenses(props: PlanExpensesProps) {
    return (
        <Box className="plan-expenses">
            <ExpensesList
                initialCustomerExpenses={props.initialCustomerExpenses}
                administrativeExpenses={props.administrativeExpenses}
                signaturesRatification={props.signaturesRatification}
                openingCommission={props.openingCommission}
                firstLastPartiality={props.firstLastPartiality}
                advancePayment={props.advancePayment}
            />
            <ExpensesTotal totalExpenses={props.totalExpenses} />
        </Box>
    );
}

export default PlanExpenses;