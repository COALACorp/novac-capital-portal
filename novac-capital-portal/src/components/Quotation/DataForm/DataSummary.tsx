type SummaryDataType = {
    label: string,
    value: string,
    startIcon?: JSX.Element,
    strong?: boolean,
};

type DataSummaryProps = {
    data: SummaryDataType[],
};

function DataSummary(props: DataSummaryProps) {
    return (
        <div id="data-form-summary">
            {props.data.map((item, index) => (
                <div key={index} className={"data-form-summary-item " + (item.strong && "strong")}>
                    <div className="data-form-summary-item-label">
                        {item.startIcon}
                        <p>{item.label}</p>
                    </div>
                    <p>{item.value}</p>
                </div>
            ))}
        </div>
    );
}

export default DataSummary;
export type { SummaryDataType };