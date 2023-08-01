import { formatAmount } from "@/utils/formats";

type PlanContentProps = {
    administrativeExpenses: number,
    firstLastPartiality: number,
    advancePayment: number,
    totalExpenses: number,
    insurance: string,
};

function PlanContent(props: PlanContentProps) {
    return (
        <div className="plan-content">
            <div className="plan-summary">
                <p className="plan-summary-title strong">Resumen</p>
                <div className="plan-expenses">
                    <div className="expenses-list">
                        <div className="plan-property">
                            <p className="strong">(-) Parcialidad Inicial y Última:</p>
                            <p>${formatAmount(props.firstLastPartiality)}</p>
                        </div>
                        <div className="plan-property">
                            <p className="strong">(-) Gastos Administrativos:</p>
                            <p>${formatAmount(props.administrativeExpenses)}*</p>
                        </div>
                        <div className="plan-property">
                            <p className="strong">(-) Anticipo:</p>
                            <p>${formatAmount(props.advancePayment)}</p>
                        </div>
                    </div>
                    <div className="expenses-total-container">
                        <div className="expenses-total">
                            <div className="plan-property">
                                <p className="strong">TOTAL Desembolso Inicial:</p>
                                <p>${formatAmount(props.totalExpenses)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="plan-insurance">
                <div className="plan-property">
                    <p className="strong">{"*Seguro del Equipo:"}</p>
                    <p>{props.insurance}</p>
                </div>
            </div>
        </div>
    );
}

export default PlanContent;