import Box from "@mui/material/Box";

type ExpensesItemProps = {
    name: string,
    amount: number,
};

function ExpensesItem(props: ExpensesItemProps) {
    return (
        <Box className="plan-property">
            <p className="strong">{"(-) " + props.name + ":"}</p>
            <p>${props.amount.toLocaleString()}</p>
        </Box>
    );
}

export default ExpensesItem;