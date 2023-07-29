import { useState, useRef } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import { formatAmount } from "@/utils/formats";

type DataTextInputProps = {
    label: string,
    labelSuffix?: string,
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
            let formattedValue = formatAmount(input);
            formattedValue = formattedValue.length > 0 ? (props.preffix + formattedValue) : "";
            input = formattedValue;
        }
        if (inputRef.current)
            inputRef.current.value = input;
        setValue(input);
    };

    return (
        <div className="data-form-input-container">
            <p id="input-label"><span className="strong">{props.label}</span> <span className="light">{props.labelSuffix}</span></p>
            <OutlinedInput
                className="data-form-input"
                placeholder={props.placeholder}
                required={props.required}
                fullWidth
                value={value}
                onChange={handleChange}
            />
            <input name={props.name} readOnly hidden ref={inputRef}/>
        </div>
    );
}

export default DataTextInput;