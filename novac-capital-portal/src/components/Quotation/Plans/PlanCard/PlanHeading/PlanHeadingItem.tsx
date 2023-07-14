import { formatAmount } from "@/utils/formats";

type PlanHeadingItemProps = {
    name: string,
    amount: number,
    bold?: boolean,
};

function PlanHeadingItem(props: PlanHeadingItemProps) {
    return (
        <p className={"plan-heading-info-item" + (props.bold ? " strong" : "")}>
            <span className="strong">{props.name}:</span> <span>${formatAmount(props.amount)}</span>
        </p>
    );
}

export default PlanHeadingItem;