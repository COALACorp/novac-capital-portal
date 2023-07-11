import Box from "@mui/material/Box";

import { formatAmount } from "@/utils/formats";

type ExpensesItemProps = {
    name: string,
    amount: number,
    comment?: boolean,
};

function ExpensesItem(props: ExpensesItemProps) {
    return (
        <Box className="plan-property">
            <p className="strong">{"(-) " + props.name + ":"}</p>
            <p>${formatAmount(props.amount.toFixed(2))}{props.comment && "*"}</p>
        </Box>
    );
}

export default ExpensesItem;