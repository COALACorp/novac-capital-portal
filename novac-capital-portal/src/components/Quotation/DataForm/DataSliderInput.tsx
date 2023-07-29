import { useState, useEffect } from "react";
import Slider from "@mui/material/Slider";

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
    onChange?: (event: Event) => void,
};

function DataSliderInput(props: DataSliderInputProps) {
    const [marks, setMarks] = useState<MarkType[]>([]);

    const valueText = (value: number) => (value + (props.scale || ""));

    const handleChange = (event: Event, value: number|number[]) => {
        if (props.onChange && typeof value === "number")
            props.onChange(event);
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
        <div className="data-form-input-container">
            <p id="input-label" className="strong">{props.label}</p>
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
        </div>
    );
}

export default DataSliderInput;