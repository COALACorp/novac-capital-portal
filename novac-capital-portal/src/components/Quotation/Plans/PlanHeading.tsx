import { formatAmount } from "@/utils/formats";

type PlanHeadingProps = {
    months: number,
    taxedEquipment: number,
    taxedPartialities: number,
};

function PlanHeading(props: PlanHeadingProps) {
    return (
        <div className="plan-heading">
            <div className="plan-avatar">
                <p className="strong">{props.months}</p>
            </div>
            <div className="plan-heading-info">
                <p className="plan-heading-title strong">Plazo a {props.months} meses</p>
                <div className="plan-heading-info-item-container">
                    <p className="plan-heading-info-item">
                        <span className="strong">Valor del equipo c/IVA:</span> <span>${formatAmount(props.taxedEquipment)}</span>
                    </p>
                    <p className="plan-heading-info-item strong">
                        <span className="strong">Parcialidades c/IVA:</span> <span>${formatAmount(props.taxedPartialities)}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default PlanHeading;