type PlanHeadingItemProps = {
    name: string,
    amount: number,
    bold?: boolean,
};

function PlanHeadingItem(props: PlanHeadingItemProps) {
    return (
        <p className={"plan-heading-item" + (props.bold ? " strong" : "")}>
            <span>{props.name}:</span> <span>${props.amount.toLocaleString()}</span>
        </p>
    );
}

export default PlanHeadingItem;