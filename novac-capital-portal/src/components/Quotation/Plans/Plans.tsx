import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import calcs from "../../../utils/calculations";
import type { ValidatedFormValuesType } from "../DataForm/DataForm";
import PlansHeading from "./PlansHeading";
import PlansCollection, { PlanType } from "./PlansCollection";

import "../../../styles/quotation/plans.css";

const clientSettings = {
    iva: 1.16,
    margin: {
        "12": 1.19,
        "18": 1.285,
        "24": 1.38,
        "36": 1.57,
        "48": 1.76,
        "60": 1.95,
    },
    plans: [12, 18, 24, 36, 48, 60],
};

type PlansProps = {
    form: ValidatedFormValuesType,
};

function Plans(props: PlansProps) {
    const [plans, setPlans] = useState<PlanType[]>([]);
    const [selection, setSelection] = useState<number>();

    useEffect(() => {
        console.log("Loading plans");
        const newPlans = clientSettings.plans.map((months): PlanType => {
            const taxedEquipment = props.form.amount;
            const totalRent = calcs.totalRent(taxedEquipment, props.form.advancePercentage, clientSettings.margin[months.toString() as keyof (typeof clientSettings.margin)])
            const taxedPartialities = calcs.taxedPartialities(totalRent, months)
            const firstLastPartiality = calcs.firstLastPartialities(taxedPartialities);
            const administrativeExpenses = 0;
            const advancePayment = calcs.advancePayment(taxedEquipment, props.form.advancePercentage);
            const totalExpenses = calcs.totalInitialExpense(firstLastPartiality, advancePayment, administrativeExpenses);
            const insurance = "Incluido";

            return (
                {
                    months,
                    taxedEquipment,
                    taxedPartialities,
                    firstLastPartiality,
                    administrativeExpenses,
                    advancePayment,
                    totalExpenses,
                    insurance,
                }
            );
        });
        setPlans(newPlans);
    }, []);

    return (
        <Box id="plans-container">
            <Box
                id="plans"
            >
                <PlansHeading client={props.form.name} />
                <PlansCollection plans={plans} onSelection={setSelection} />
            </Box>
            <Button id="plans-submit" disabled={!selection}>Continuar</Button>
        </Box>
    );
}

export default Plans;