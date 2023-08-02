import { useState, useEffect } from "react";

import DataForm, { ValidatedFormValuesType } from "./DataForm/DataForm";
import Plans, { PlanType } from "./Plans/Plans";

import { useAppDispatch } from "@/app/hooks";
import { QuotationValue, setQuotation } from "@/features/quotation/quotationSlice";

function Quotation() {
    const dispatch = useAppDispatch();
    const [formValues, setFormValues] = useState<ValidatedFormValuesType|null>();
    const [plan, setPlan] = useState<PlanType|null>(null);

    const handleFormSubmit = (values: ValidatedFormValuesType) => {
        setFormValues(values);
    };

    const handlePlanSubmit = (plan: PlanType) => {
        setPlan(plan);
    };

    useEffect(() => {
        if (formValues && plan) {
            const newQuotationValue: QuotationValue = {
                formValues,
                selectedPlan: plan,
            }
            dispatch(setQuotation(newQuotationValue));
        }
    }, [formValues, plan]);

    return formValues ? <Plans form={formValues} onSubmit={handlePlanSubmit} /> : <DataForm onSubmit={handleFormSubmit} />;
}

export default Quotation;