import Stack from "@mui/material/Stack";
import OutlinedInput from "@mui/material/OutlinedInput";

type DataTextInputProps = {
    label: string,
    placeholder?: string,
    startAdornment?: string,
    name?: string,
    required?: boolean,
    onChange?: React.ChangeEventHandler<HTMLInputElement|HTMLTextAreaElement>,
};

function DataTextInput(props: DataTextInputProps) {
    return (
        <Stack className="quotation-data-form-input-container">
            <p id="quotation-input-label">{props.label}</p>
            <OutlinedInput
                className="quotation-data-form-input"
                placeholder={props.placeholder}
                startAdornment={props.startAdornment}
                required={props.required}
                fullWidth
                name={props.name}
                onChange={props.onChange}
            />
        </Stack>
    );
}

export default DataTextInput;