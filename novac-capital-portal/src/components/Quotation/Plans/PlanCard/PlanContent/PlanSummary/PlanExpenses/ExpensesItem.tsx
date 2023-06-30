import Box from "@mui/material/Box";

type ExpensesItemProps = {
    name: string,
    amount: number,
    comment?: boolean,
};

function ExpensesItem(props: ExpensesItemProps) {
    return (
        <Box className="plan-property">
            <p className="strong">{"(-) " + props.name + ":"}</p>
            <p>${props.amount.toLocaleString()}{props.comment && "*"}</p>
        </Box>
    );
}

export default ExpensesItem;