import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import DataForm, { ValidatedFormValuesType } from "./DataForm/DataForm";
import Plans from "./Plans/Plans";

import { auth } from "../../utils/firebase";

import "../../styles/quotation/quotation.css";

function Quotation() {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState<ValidatedFormValuesType|null>();

    const handleSubmit = (values: ValidatedFormValuesType) => {
        setFormValues(values);
    };

    useEffect(() => {
        if(auth.currentUser)
            navigate("/signin");
    }, []);

    return formValues ? <Plans form={formValues} /> : <DataForm onSubmit={handleSubmit} />;
    // return formValues && <Plans form={formValues} />;
}

export default Quotation;