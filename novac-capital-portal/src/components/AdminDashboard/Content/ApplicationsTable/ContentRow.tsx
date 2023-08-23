import { formatAmount } from "@/utils/formats";

type ContentRowProps = {
    applicationId: number,
    months: number|string,
    name: string,
    equipment: string,
    progress: number,
    advanceAmount: number,
    amount: number,
    date: string,
    onClick?: (applicationId: number) => void,
};

function ContentRow(props: ContentRowProps) {
    const handleClick = () => {
        props.onClick && props.onClick(props.applicationId);
    };

    return (
        <tr className="selectable" onClick={handleClick}>
            <td>
                <div className="term">
                    <p className="months">{props.months}</p>
                    <p>meses</p>
                </div>
            </td>
            <td>
                <p>{props.name}</p>
            </td>
            <td>
                <p>{props.equipment}</p>
            </td>
            <td>
                <div className="progress">
                    <div className="bar">
                        <div className="indicator" style={{ width: (props.progress + "%") }} />
                    </div>
                    <p>{props.progress}%</p>
                </div>
            </td>
            <td>
                <p>${formatAmount(props.advanceAmount ?? 0)}</p>
            </td>
            <td>
                <p>${formatAmount(props.amount)}</p>
            </td>
            <td>
                <p>{props.date}</p>
            </td>
        </tr>
    );
}

export default ContentRow;
export type { ContentRowProps };