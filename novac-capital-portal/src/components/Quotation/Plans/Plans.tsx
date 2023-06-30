import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import calcs from "@/utils/calculations";
import type { ValidatedFormValuesType } from "../DataForm/DataForm";
import PlansHeading from "./PlansHeading";
import PlansCollection, { PlanType } from "./PlansCollection";

import { useAppSelector } from "@/app/hooks";
import { selectParams } from "@/features/params/paramsSlice";

import "@/styles/quotation/plans.css";

type PlansProps = {
    form: ValidatedFormValuesType,
};

function Plans(props: PlansProps) {
    const clientParams = useAppSelector(selectParams);
    const router = useRouter();
    const [plans, setPlans] = useState<PlanType[]>([]);
    const [selection, setSelection] = useState<number>();

    const handleSubmit = () => {
        router.push("/signin");
    };

    useEffect(() => {
        console.log("Form data:", props.form);
        console.log("Loading plans");
        if (clientParams) {
            const newPlans = clientParams.plans.map((months): PlanType => {
                const taxedEquipment = props.form.amount;
                const totalRent = calcs.totalRent(taxedEquipment, props.form.advancePercentage, clientParams.planMargins[months.toString() as keyof (typeof clientParams.planMargins)])
                const taxedPartialities = calcs.taxedPartialities(totalRent, months)
                const firstLastPartiality = calcs.firstLastPartialities(taxedPartialities);
                const administrativeExpenses = calcs.administrativeExpenses(
                    clientParams.initialCustomerExpenses,
                    clientParams.administrativeExpense,
                    clientParams.signaturesRatification,
                    clientParams.folioVerification,
                    clientParams.openingCommission,
                    clientParams.creditBureau,
                    clientParams.iva
                );
                const advancePayment = calcs.advancePayment(taxedEquipment, props.form.advancePercentage);
                const totalExpenses = calcs.totalInitialExpense(firstLastPartiality, advancePayment, administrativeExpenses);
                const insurance = "Incluido";
    
                const planData = {
                    months,
                    taxedEquipment,
                    taxedPartialities,
                    firstLastPartiality,
                    administrativeExpenses,
                    advancePayment,
                    totalExpenses,
                    insurance,
                };
    
                console.log("Plan data:", planData);
    
                return planData;
            });
            setPlans(newPlans);
        } else
            console.log("Client params not defined");
    }, [props.form, clientParams]);

    return (
        <Box id="plans-container">
            <Box
                id="plans"
            >
                <PlansHeading client={props.form.name} />
                <PlansCollection plans={plans} onSelection={setSelection} />
            </Box>
            <Button id="plans-submit" disabled={!selection} onClick={handleSubmit}>Continuar</Button>
        </Box>
    );
}

export default Plans;