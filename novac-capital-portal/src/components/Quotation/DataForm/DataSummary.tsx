import Box from "@mui/material/Box";

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
        <Box id="quotation-data-form-summary">
            {props.data.map((item, index) => (
                <Box key={index} className={"quotation-data-form-summary-item " + (item.strong && "strong")}>
                    <p>{item.startIcon} {item.label}</p>
                    <p>{item.value}</p>
                </Box>
            ))}
        </Box>
    );
}

export default DataSummary;
export type { SummaryDataType };