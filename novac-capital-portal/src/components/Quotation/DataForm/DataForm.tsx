import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import FormHeading from "../../FormHeading";
import DataTextInput from "./DataTextInput";
import DataSliderInput from "./DataSliderInput";
import DataSummary, { SummaryDataType } from "./DataSummary";

import "../../../styles/quotation/dataform.css";

const initialSummary: SummaryDataType[] = [
    {
        label: "Monto de equipo",
        value: "$0",
        startIcon: (
            <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.8906 4.16875L14.8406 1.025C14.6375 0.4125 14.0656 0 13.4187 0H3.58125C2.93437 0 2.3625 0.4125 2.15937 1.025L0.578125 5.76875C0.528125 5.92188 0.5 6.08125 0.5 6.24375V14.5C0.5 15.3281 1.17188 16 2 16H14.5C17.8125 16 20.5 13.3125 20.5 10C20.5 7.16562 18.5312 4.79687 15.8906 4.16875ZM9.25 1.5H13.4187L14.2563 4.0125C12.7 4.075 11.2969 4.72187 10.2656 5.75H9.25V1.5ZM3.58125 1.5H7.75V5.75H2.16562L3.58125 1.5ZM2 14.5V7.25H9.17188C8.74687 8.075 8.5 9.00937 8.5 10C8.5 11.7937 9.29062 13.4 10.5406 14.5H2ZM14.5 14.5C12.0188 14.5 10 12.4812 10 10C10 7.51875 12.0188 5.5 14.5 5.5C16.9813 5.5 19 7.51875 19 10C19 12.4812 16.9813 14.5 14.5 14.5ZM16.5187 8.07187C16.4219 7.975 16.2656 7.975 16.1687 8.07187L13.9844 10.2375L13.0375 9.28125C12.9406 9.18437 12.7844 9.18437 12.6875 9.28125L12.1031 9.8625C12.0062 9.95937 12.0062 10.1156 12.1031 10.2125L13.8031 11.9281C13.9 12.025 14.0562 12.025 14.1531 11.9281L17.0969 9.00625C17.1937 8.90938 17.1937 8.75312 17.0969 8.65625L16.5187 8.07187Z" fill="#828282"/>
            </svg>
        ),
    },
    {
        label: "Anticipo",
        value: "$0",
        startIcon: (
            <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5 0.5C4.9793 0.5 0.5 3.01719 0.5 6.125V10.5C0.5 13.2625 4.9793 15.5 10.5 15.5C16.0207 15.5 20.5 13.2625 20.5 10.5V6.125C20.5 3.01719 16.0207 0.5 10.5 0.5ZM3.9375 12.1941C2.93828 11.6391 2.375 11.0156 2.375 10.5V9.3957C2.86079 9.77144 3.38446 10.0955 3.9375 10.3625V12.1941ZM7.6875 13.4004C6.83588 13.2674 5.9988 13.054 5.1875 12.7629V10.8844C6.00044 11.1697 6.83703 11.3825 7.6875 11.5203V13.4004ZM12.0625 13.5566C11.5621 13.5996 11.043 13.6262 10.5 13.6262C9.95703 13.6262 9.43789 13.5996 8.9375 13.5566V11.6746C9.44805 11.7199 9.96719 11.75 10.5 11.75C11.0328 11.75 11.552 11.7199 12.0625 11.6746V13.5566ZM15.8125 12.7641C15.0012 13.0552 14.1641 13.2686 13.3125 13.4016V11.5203C14.163 11.3825 14.9996 11.1697 15.8125 10.8844V12.7641ZM18.625 10.5C18.625 11.0156 18.0617 11.6391 17.0625 12.1941V10.3625C17.6155 10.0955 18.1392 9.77144 18.625 9.3957V10.5ZM10.5 9.875C5.85156 9.875 2.375 7.89531 2.375 6.125C2.375 4.35469 5.85156 2.375 10.5 2.375C15.1484 2.375 18.625 4.35469 18.625 6.125C18.625 7.89531 15.1504 9.875 10.5 9.875Z" fill="#828282"/>
            </svg>
        ),
    },
    {
        label: "Monto total de arrendamiento",
        value: "$0",
        startIcon: (
            <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 0C8.85938 0 5.5 1.39844 5.5 3.125V5.17969C2.58984 5.60938 0.5 6.76563 0.5 8.125V16.875C0.5 18.6016 3.85938 20 8 20C12.1406 20 15.5 18.6016 15.5 16.875V14.8164C18.4102 14.3867 20.5 13.2344 20.5 11.875V3.125C20.5 1.39844 17.1406 0 13 0ZM13.625 16.7305C13.2344 17.1875 11.2656 18.125 8 18.125C4.73438 18.125 2.76562 17.1875 2.375 16.7305V15.1875C3.75 15.8359 5.75781 16.25 8 16.25C10.2422 16.25 12.25 15.8359 13.625 15.1875V16.7305ZM13.625 12.9805C13.2344 13.4375 11.2656 14.375 8 14.375C4.73438 14.375 2.76562 13.4375 2.375 12.9805V11.2266C3.75 12.0078 5.75781 12.5 8 12.5C10.2422 12.5 12.25 12.0039 13.625 11.2266V12.9805ZM8 10.625C4.89453 10.625 2.375 9.78516 2.375 8.75C2.375 7.71484 4.89453 6.875 8 6.875C11.1055 6.875 13.625 7.71484 13.625 8.75C13.625 9.78516 11.1055 10.625 8 10.625ZM18.625 11.7305C18.3477 12.0547 17.2617 12.6133 15.5 12.918V11.0547C16.7109 10.875 17.793 10.582 18.625 10.1875V11.7305ZM18.625 7.98047C18.3477 8.30469 17.2617 8.86328 15.5 9.16797V8.125C15.5 7.84375 15.4023 7.57031 15.2344 7.30859C16.5547 7.10156 17.7344 6.73047 18.625 6.22266V7.98047V7.98047ZM13 5.625C12.8047 5.625 12.6172 5.61328 12.4258 5.60547C11.4102 5.29687 10.207 5.08984 8.89453 5.02344C7.96094 4.6875 7.375 4.24219 7.375 3.75C7.375 2.71484 9.89453 1.875 13 1.875C16.1055 1.875 18.625 2.71484 18.625 3.75C18.625 4.78516 16.1055 5.625 13 5.625Z" fill="black"/>
            </svg>
        ),
        strong: true,
    },
];

type ValidatedFormValuesType = {
    name: string,
    item: string,
    amount: number,
    advancePercentage: number,
};

type FormValuesType = {
    name?: string,
    item?: string,
    amount?: number,
    advancePercentage?: number,
};

type DataFormProps = {
    onSubmit?: (formValues: ValidatedFormValuesType) => void,
};

function DataForm(props: DataFormProps) {
    const formRef = useRef<HTMLFormElement>(null);
    const [formValues, setFormValues] = useState<FormValuesType>({});
    const [summary, setSummary] = useState<SummaryDataType[]>(initialSummary);
    const [valid, setValid] = useState<boolean>(false);

    const inputToNumber = (input: string): number => Number(Number(input.replace(/[^\d.]/g, "")).toFixed(2));

    const generateForm = (event: React.FormEvent<HTMLFormElement>) => new FormData(event.currentTarget);

    const generateFormValues = (data: FormData): FormValuesType => ({
        ...formValues,
        name: (data.get("name")?.toString() ?? ""),
        item: (data.get("item")?.toString() ?? ""),
        amount: inputToNumber(data.get("amount")?.toString() ?? ""),
        advancePercentage: inputToNumber(data.get("advancePercentage")?.toString() ?? ""),
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newFormValues = generateFormValues(generateForm(event));
        if (newFormValues.name && newFormValues.item && newFormValues.amount && newFormValues.advancePercentage)
            props.onSubmit && props.onSubmit(newFormValues as ValidatedFormValuesType);
    };

    const handleFormChange = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Form:", generateForm(event).get("amount"));
        const newFormValues = generateFormValues(generateForm(event));
        setFormValues(newFormValues);
    };

    const handleInputChange = (event: any) => {
        const newFormValues: FormValuesType = { ...formValues };
        newFormValues[event.target.name as keyof FormValuesType] = event.target.value,
        setFormValues(newFormValues);
    };

    useEffect(() => {
        const equipmentCost = formValues.amount ?? 0;
        const advancePercentage = Number((equipmentCost * ((formValues.advancePercentage ?? 5) / 100)).toFixed(2));
        const totalLease = equipmentCost - advancePercentage;

        const newSummary = [ ...summary ];
        newSummary[0].value = "$" + equipmentCost.toLocaleString();
        newSummary[1].value = "$" + advancePercentage.toLocaleString();
        newSummary[2].value = "$" + totalLease.toLocaleString();

        setSummary(newSummary);
    }, [formValues.amount, formValues.advancePercentage]);

    useEffect(() => {
        const newValid = (
            (formValues.name !== undefined && formValues.name.trim().length > 0)
            && (formValues.item !== undefined && formValues.item.trim().length > 0)
            && (formValues.amount !== undefined && formValues.amount > 0)
        );
        setValid(newValid);
    }, [formValues.name, formValues.item, formValues.amount, formValues.advancePercentage]);

    return (
        <Box id="data-form-container">
            <FormHeading title="Cotiza tu arrendamiento" subtitle="This is a subtitle parsed to FormHeading" />
            <Box
                id="data-form"
                component="form"
                onSubmit={handleSubmit}
                onChange={handleFormChange}
                ref={formRef}
            >
                <Stack id="data-form-content">
                    <DataTextInput label="Nombre del cliente" placeholder="Nombre del cliente" name="name" required />
                    <DataTextInput label="Nombre de equipo a cotizar" placeholder="Nombre de equipo a cotizar" name="item" required />
                    <DataTextInput label="Monto de equipo a cotizar" labelSuffix="(IVA incluido)" placeholder="Monto de equipo a cotizar" preffix="$" name="amount" isNumber required />
                    <DataSliderInput label="Anticipo" min={0} max={30} step={5} scale="%" defaultValue={5} showMarks name="advancePercentage" onChange={handleInputChange} />
                    <DataSummary data={summary} />
                </Stack>
                <Button id="data-form-submit" type="submit" disabled={!valid}>Cotizar</Button>
            </Box>
        </Box>
    );
}

export default DataForm;
export type { FormValuesType, ValidatedFormValuesType };