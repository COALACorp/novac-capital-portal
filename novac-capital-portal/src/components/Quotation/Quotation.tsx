import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";

import Heading from "./Heading";
import DataForm, { FormValuesType } from "./DataForm/DataForm";
import Plans from "./Plans/Plans";

import { auth } from "../../utils/firebase";

import "../../styles/quotation.css";

function Quotation() {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState<FormValuesType|null>(null);

    const handleSubmit = (values: FormValuesType) => {
        setFormValues(values);
    };

    useEffect(() => {
        if(!auth)
            navigate("/signin")
    }, [navigate]);

    return (
        <Box id="quotation-container">
            <Heading />
            {formValues
                ? <Plans />
                : <DataForm onSubmit={handleSubmit} />
            }
        </Box>
    );
}

export default Quotation;