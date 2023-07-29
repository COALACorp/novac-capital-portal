import { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

type PhoneNumberInputProps = {
    name: string,
};

function PhoneNumberInput(props: PhoneNumberInputProps) {
    const [value, setValue] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        const formatted = newValue
            .replace(/\D/g, "") // Remove non-digit characters
            .replace(/(?<=\d{10})\d+/, "") // Remove extra digits
            .replace(/^(\d{2})(\d{4})(\d{1,4})$/, '$1-$2-$3')
            .replace(/^(\d{2})(\d{1,4})$/, '$1-$2');
        setValue(formatted);
    };

    return (
        <>
            <TextField
                margin="normal"
                required
                fullWidth
                id="phone"
                label="Número de teléfono"
                type="tel"
                value={value}
                onChange={handleChange}
                InputProps={{
                    startAdornment: <InputAdornment position="start">(+52)</InputAdornment>,
                }}
            />
            <input type="hidden" name={props.name} value={"(+52) " + value}/>
        </>
    );
}

export default PhoneNumberInput;