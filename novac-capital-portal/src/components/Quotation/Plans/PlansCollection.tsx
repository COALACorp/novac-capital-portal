import { useState } from "react";
import Box from "@mui/material/Box";

import PlanCard from "./PlanCard/PlanCard";

type PlanType = {
    months: number,
    taxedEquipment: number,
    taxedPartialities: number,
    administrativeExpenses: number,
    firstLastPartiality: number,
    advancePayment: number,
    totalExpenses: number,
    insurance: string,
};

type PlansCollectionProps = {
    plans: PlanType[],
    onSelection?: (selection: number) => void,
};

function PlansCollection(props: PlansCollectionProps) {
    const [selection, setSelection] = useState<number>();

    const handleSelection = (selection: number) => {
        console.log("Plan selected:", selection);
        setSelection(selection);
        props.onSelection && props.onSelection(selection);
    };

    return (
        <Box id="plans-collection">
            {props.plans.map((plan, index) => (
                <PlanCard
                    key={index}
                    months={plan.months}
                    taxedEquipment={plan.taxedEquipment}
                    taxedPartialities={plan.taxedPartialities}
                    administrativeExpenses={plan.administrativeExpenses}
                    firstLastPartiality={plan.firstLastPartiality}
                    advancePayment={plan.advancePayment}
                    totalExpenses={plan.totalExpenses}
                    insurance={plan.insurance}
                    selected={selection === plan.months}
                    onSelect={handleSelection}
                />
            ))}
        </Box>
    );
}

export default PlansCollection;
export type { PlanType };