import { useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";

type SelectInputOption = {
    value: string,
    label: string,
};

type DataSelectInputProps = {
    label: string,
    labelSuffix?: string,
    placeholder?: string,
    name?: string,
    options: SelectInputOption[],
    required?: boolean,
    onChange?: (event: SelectChangeEvent) => void,
};

function DataSelectInput(props: DataSelectInputProps) {
    const [value, setValue] = useState("");

    const handleChange = (event: SelectChangeEvent) => {
        const input = event.target.value;
        setValue(input);
        props.onChange && props.onChange(event);
    };

    return (
        <div className="data-form-input-container">
            <p id="input-label"><span className="strong">{props.label}</span> <span className="light">{props.labelSuffix}</span></p>
            <Select
                className="data-form-input"
                required={props.required}
                fullWidth
                name={props.name}
                value={value}
                input={<OutlinedInput />}
                renderValue={selected => {
                    if (selected.length === 0) {
                        return "Seleccione una opción";
                    }
                    return props.options.find(option => option.value === selected)?.label;
                }}
                onChange={handleChange}
                displayEmpty
            >
                {props.options.map((option, index) => (
                    <MenuItem
                        key={index}
                        value={option.value}
                    >
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </div>
    );
}

export default DataSelectInput;