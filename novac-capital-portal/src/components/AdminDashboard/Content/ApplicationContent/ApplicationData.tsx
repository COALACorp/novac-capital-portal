import { useEffect } from "react";

import { ApplicationFullData } from "@/utils/api";
import { formatAmount } from "@/utils/formats";
import calcs from "@/utils/calculations";

type ApplicationDataProps = {
    application: ApplicationFullData,
};

function ApplicationData(props: ApplicationDataProps) {
    const administrativeExpenses = calcs.addIVA(props.application.application.plan.administrative + props.application.application.plan.credit_bureau + props.application.application.plan.folio_verification, props.application.application.plan.iva);

    return (
        <>
            <div id="application-data">
                <div className="application-data-section">
                    <p>Plazo</p>
                    <p>{props.application.application.plan.dues} meses</p>
                </div>
                <div className="application-data-section">
                    <p>Teléfono</p>
                    <p>{props.application.user.phone}</p>
                </div>
                <div className="application-data-section">
                    <p>Email</p>
                    <p>{props.application.user.email}</p>
                </div>
                <div className="application-data-section">
                    <p>Nombre de equipo</p>
                    <p>{props.application.application.equipment}</p>
                </div>
                <div className="application-data-section">
                    <p>Fecha</p>
                    <p>{new Date(props.application.application.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ANTICIPO</th>
                        <th>PARCIALIDADES CON IVA</th>
                        <th>GASTOS ADMINISTRATIVOS</th>
                        <th>PAGO INICIAL</th>
                        <th>COSTO EQUIPO</th>
                        <th>EQUIPO CON IVA</th>
                        <th>TOTAL A FINANCIAR</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <p>${formatAmount(props.application.application.advanceAmount)}</p>
                        </td>
                        <td>
                            <p>${formatAmount(props.application.application.partiality)}</p>
                        </td>
                        <td>
                            <p>${formatAmount(administrativeExpenses)}</p>
                        </td>
                        <td>
                            <p>${formatAmount(props.application.application.initialPayment - administrativeExpenses)}</p>
                        </td>
                        <td>
                            <p>${formatAmount(props.application.application.cost / props.application.application.iva)}</p>
                        </td>
                        <td>
                            <p>${formatAmount(props.application.application.cost)}</p>
                        </td>
                        <td>
                            <p>${formatAmount(props.application.application.loanAmount)}</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}

export default ApplicationData;