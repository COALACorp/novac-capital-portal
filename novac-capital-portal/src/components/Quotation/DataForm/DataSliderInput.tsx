import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";

import "../../../styles/quotation.css";

type MarkType = {
    value: number,
    label: string,
};

type DataSliderInputProps = {
    label: string,
    min: number,
    max: number,
    step: number,
    scale?: string,
    defaultValue?: number,
    showMarks?: boolean,
    name?: string,
    onChange?: (value: number) => void,
};

function DataSliderInput(props: DataSliderInputProps) {
    const [marks, setMarks] = useState<MarkType[]>([]);

    const valueText = (value: number) => (value + (props.scale || ""));

    const handleChange = (event: Event, value: number|number[]) => {
        if (typeof value === "number")
            props.onChange && props.onChange(value);
    };

    useEffect(() => {
        const newMarks: MarkType[] = [];
        for (let i = props.min; i <= props.max; i += props.step)
            newMarks.push({
                value: i,
                label: (i + (props.scale || "")),
            });
        setMarks(newMarks);
    }, [props.min, props.max, props.step, props.scale]);

    return (
        <Stack className="quotation-data-form-input-container">
            <p id="quotation-input-label">{props.label}</p>
            <Slider
                aria-label={props.label}
                defaultValue={props.defaultValue}
                getAriaValueText={valueText}
                min={props.min}
                max={props.max}
                step={null}
                marks={marks}
                name={props.name}
                onChange={handleChange}
            />
        </Stack>
    );
}

export default DataSliderInput;