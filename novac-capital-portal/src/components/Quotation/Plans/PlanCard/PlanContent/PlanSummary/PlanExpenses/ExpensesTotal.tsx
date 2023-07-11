import Box from "@mui/material/Box";

import { formatAmount } from "@/utils/formats";

type ExpensesTotalProps = {
    totalExpenses: number,
};

function ExpensesTotal(props: ExpensesTotalProps) {
    return (
        <Box className="expenses-total-container">
            <Box className="expenses-total">
                <Box className="plan-property">
                    <p className="strong">TOTAL Desembolso Inicial:</p>
                    <p>${formatAmount(props.totalExpenses.toFixed(2))}</p>
                </Box>
            </Box>
        </Box>
    );
}

export default ExpensesTotal;