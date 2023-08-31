import "@/styles/quotation/plans.css";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import PrintIcon from '@mui/icons-material/Print';
import ReactToPrint from "react-to-print";

import calcs from "@/utils/calculations";
import type { ValidatedFormValuesType } from "../DataForm/DataForm";
import FormHeading from "@/components/FormHeading";
import PlanHeading from "./PlanHeading";
import PlanContent from "./PlanContent";

import { useAppSelector } from "@/app/hooks";
import { selectParams } from "@/features/params/paramsSlice";

type PlanType = {
    months: number,
    taxedEquipment: number,
    totalRent: number
    taxedPartialities: number,
    administrativeExpenses: number,
    firstLastPartiality: number,
    advancePayment: number,
    totalExpenses: number,
    insurance: string,
};

type PlansProps = {
    form: ValidatedFormValuesType,
    onSubmit?: (plan: PlanType) => void,
};

function Plans(props: PlansProps) {
    const clientParams = useAppSelector(selectParams);
    const router = useRouter();
    const printRef = useRef(null);
    const [plans, setPlans] = useState<PlanType[]>([]);
    const [selection, setSelection] = useState<number>();

    const handleSubmit = () => {
        const selectedPlan = plans.find(value => value.months === selection);
        if (selectedPlan) {
            props.onSubmit && props.onSubmit(selectedPlan);
            router.push("/signin?origin=quotation");
        }
    };

    useEffect(() => {
        // console.log("Form data:", props.form);
        // console.log("Loading plans");
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
                    clientParams.iva,
                );
                const advancePayment = calcs.advancePayment(taxedEquipment, props.form.advancePercentage);
                const totalExpenses = calcs.totalInitialExpense(firstLastPartiality, advancePayment, administrativeExpenses);
                const insurance = "Incluido";
    
                const planData = {
                    months,
                    taxedEquipment,
                    totalRent,
                    taxedPartialities,
                    firstLastPartiality,
                    administrativeExpenses,
                    advancePayment,
                    totalExpenses,
                    insurance,
                };
    
                // console.log("Plan data:", planData);
    
                return planData;
            });
            setPlans(newPlans);
        } else
            console.log("Client params not defined");
    }, [props.form, clientParams]);

    useEffect(() => {
        if (window.innerWidth <= 600 && selection)
            handleSubmit();
    }, [selection])

    return (
        <div id="plans-container">
            <div id="plans">
                <div id="plans-heading-container">
                    <FormHeading title="Cotiza tu arrendamiento" />
                    <div id="plans-collection-heading">
                        <p><span className="strong">Nombre del cliente:</span> {props.form.name}</p>
                        <p><span className="strong">Fecha:</span> {new Date().toLocaleDateString("es-MX")}</p>
                    </div>
                </div>
                <div id="plans-collection" ref={printRef}>
                    {plans.map((plan, index) => (
                        <a key={index} className="plan-card-container" onClick={() => setSelection(plan.months)}>
                            <div className={"plan-card" + (selection === plan.months ? " selected" : "")}>
                                <PlanHeading
                                    months={plan.months}
                                    taxedEquipment={plan.taxedEquipment}
                                    taxedPartialities={plan.taxedPartialities}
                                />
                                <PlanContent
                                    administrativeExpenses={plan.administrativeExpenses}
                                    firstLastPartiality={plan.firstLastPartiality}
                                    advancePayment={plan.advancePayment}
                                    totalExpenses={plan.totalExpenses}
                                    insurance={plan.insurance}
                                />
                            </div>
                        </a>
                    ))}
                </div>
            </div>
            <Button id="plans-submit" disabled={!selection} onClick={handleSubmit}>Continuar</Button>
            <ReactToPrint
                bodyClass="printable"
                documentTitle="Available_Plans"
                content={() => printRef.current}
                trigger={() => (
                    <div id="print-button">
                        <PrintIcon className="print-icon" />
                    </div>
                )}
                pageStyle="@page { size: auto; margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; } }"
            />
        </div>
    );
}

export default Plans;
export type { PlanType };