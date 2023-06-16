import { useState } from "react";

import DataForm, { ValidatedFormValuesType } from "./DataForm/DataForm";
import Plans from "./Plans/Plans";

import "../../styles/quotation/quotation.css";

function Quotation() {
    const [formValues, setFormValues] = useState<ValidatedFormValuesType|null>();

    const handleSubmit = (values: ValidatedFormValuesType) => {
        setFormValues(values);
    };

    return formValues ? <Plans form={formValues} /> : <DataForm onSubmit={handleSubmit} />;
    // return formValues && <Plans form={formValues} />;
}

export default Quotation;