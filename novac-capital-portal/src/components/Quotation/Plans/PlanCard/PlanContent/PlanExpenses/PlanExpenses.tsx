import Box from "@mui/material/Box";

import ExpensesList from "./ExpensesList";
import ExpensesTotal from "./ExpensesTotal";

function PlanExpenses() {
    return (
        <Box className="plan-expenses">
            <ExpensesList administrative={7938.01} folioVerification={1286.24} creditBureau={575.75} equipmentInssurance="Incluido" />
            <ExpensesTotal totalExpenses={9800.00} />
        </Box>
    );
}

export default PlanExpenses;