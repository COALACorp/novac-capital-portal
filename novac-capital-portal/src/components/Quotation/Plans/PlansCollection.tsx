import { useState } from "react";
import Box from "@mui/material/Box";

import PlanCard from "./PlanCard/PlanCard";

// type PlanType = {
//     months: number,
//     equipment: number,
//     partialities: number,
//     firstLastPartiality: number,
//     administrative: number,
//     advancePayment: number,
//     totalExpenses: number,
//     insurance: string,
// };

type PlansCollectionProps = {
    // plans: PlanType[],
    plans: number[],
    onSelection?: (selection: number) => void,
};

function PlansCollection(props: PlansCollectionProps) {
    const [selection, setSelection] = useState<number>();

    const handleSelection = (selection: number) => {
        setSelection(selection);
        props.onSelection && props.onSelection(selection);
    };

    return (
        <Box id="plans-collection">
            {props.plans.map((plan, index) => (
                <PlanCard
                    key={index}
                    months={plan}
                    equipment={1350000}
                    partialities={126735}
                    firstLastPartiality={111812.40}
                    administrative={9800}
                    advancePayment={55906.20}
                    totalExpenses={184252.40}
                    insurance={"Incluido"}
                    selected={selection === plan}
                    onClick={handleSelection}
                />
            ))}
        </Box>
    );
}

export default PlansCollection;