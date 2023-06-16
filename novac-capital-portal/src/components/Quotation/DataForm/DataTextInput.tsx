import { useState, useRef } from "react";
import Stack from "@mui/material/Stack";
import OutlinedInput from "@mui/material/OutlinedInput";

type DataTextInputProps = {
    label: string,
    placeholder?: string,
    preffix?: string,
    isNumber?: boolean,
    name?: string,
    required?: boolean,
};

function DataTextInput(props: DataTextInputProps) {
    const [value, setValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        let input = event.target.value;
        if (props.isNumber) {
            let formattedValue = input.replace(/[^\d.]/g, "");
            formattedValue = formattedValue.match(/\d+(\.\d{0,2})?/)?.[0] ?? "";
            formattedValue = formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            formattedValue = formattedValue.length > 0 ? (props.preffix + formattedValue) : "";
            input = formattedValue;
        }
        if (inputRef.current)
            inputRef.current.value = input;
        setValue(input);
    };

    return (
        <Stack className="data-form-input-container">
            <p id="input-label">{props.label}</p>
            <OutlinedInput
                className="data-form-input"
                placeholder={props.placeholder}
                required={props.required}
                fullWidth
                value={value}
                onChange={handleChange}
            />
            <input name={props.name} readOnly hidden ref={inputRef}/>
        </Stack>
    );
}

export default DataTextInput;