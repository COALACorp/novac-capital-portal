import { useState } from "react";
import Stack from "@mui/material/Stack";
import OutlinedInput from "@mui/material/OutlinedInput";

type DataTextInputProps = {
    label: string,
    placeholder?: string,
    preffix?: string,
    isNumber?: boolean,
    name?: string,
    required?: boolean,
    onChange?: (value: string) => void,
};

function DataTextInput(props: DataTextInputProps) {
    const [value, setValue] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        let input = event.target.value;
        if (props.isNumber) {
            input = input.replace(/[^0-9]/g, "");
            const numberInput = Number(Number(input).toFixed(2));
            const formattedValue = numberInput > 0 ? (props.preffix + numberInput.toLocaleString()) : "";
            input = formattedValue;
        }
        setValue(input);
        props.onChange && props.onChange(input);
    };

    return (
        <Stack className="quotation-data-form-input-container">
            <p id="quotation-input-label">{props.label}</p>
            <OutlinedInput
                className="quotation-data-form-input"
                placeholder={props.placeholder}
                required={props.required}
                fullWidth
                name={props.name}
                value={value}
                onChange={handleChange}
            />
        </Stack>
    );
}

export default DataTextInput;