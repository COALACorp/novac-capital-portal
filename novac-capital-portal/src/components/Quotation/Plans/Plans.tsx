import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import calcs from "../../../utils/calculations";
import type { ValidatedFormValuesType } from "../DataForm/DataForm";
import PlansHeading from "./PlansHeading";
import PlansCollection, { PlanType } from "./PlansCollection";

import "../../../styles/quotation/plans.css";

const clientSettings = {
    plans: [12, 18, 24, 36, 48, 60],
    iva: 1.16,
    margin: {
        "12": 1.19,
        "18": 1.285,
        "24": 1.38,
        "36": 1.57,
        "48": 1.76,
        "60": 1.95,
    },
	initialCustomerExpenses: null,
	administrative: 6843.11,
	signaturesRatification: null,
	folioVerification: 1108.83,
	openingCommission: null,
	creditBureau: 496.34,
};

type PlansProps = {
    form: ValidatedFormValuesType,
};

function Plans(props: PlansProps) {
    const navigate = useNavigate();
    const [plans, setPlans] = useState<PlanType[]>([]);
    const [selection, setSelection] = useState<number>();

    const handleSubmit = () => {
        navigate("/signin");
    };

    useEffect(() => {
        console.log("Form data:", props.form);
        console.log("Loading plans");
        const newPlans = clientSettings.plans.map((months): PlanType => {
            const taxedEquipment = props.form.amount;
            const totalRent = calcs.totalRent(taxedEquipment, props.form.advancePercentage, clientSettings.margin[months.toString() as keyof (typeof clientSettings.margin)])
            const taxedPartialities = calcs.taxedPartialities(totalRent, months)
            const initialCustomerExpenses = 0;
            const firstLastPartiality = calcs.firstLastPartialities(taxedPartialities);
            const signaturesRatification = 0;
            const openingCommission = 0;
            const administrativeExpenses = calcs.administrativeExpenses(clientSettings.administrative, clientSettings.folioVerification, clientSettings.creditBureau, clientSettings.iva);
            const advancePayment = calcs.advancePayment(taxedEquipment, props.form.advancePercentage);
            const totalExpenses = calcs.totalInitialExpense(firstLastPartiality, advancePayment, administrativeExpenses);
            const insurance = "Incluido";

            const planData = {
                months,
                taxedEquipment,
                taxedPartialities,
                initialCustomerExpenses,
                firstLastPartiality,
                signaturesRatification,
                openingCommission,
                administrativeExpenses,
                advancePayment,
                totalExpenses,
                insurance,
            };

            console.log("Plan data:", planData);

            return planData;
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
            <Button id="plans-submit" disabled={!selection} onClick={handleSubmit}>Continuar</Button>
        </Box>
    );
}

export default Plans;