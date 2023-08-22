import { ApplicationFullData } from "@/utils/api";

import { formatAmount } from "@/utils/formats";

type ApplicationDataProps = {
    application: ApplicationFullData,
};

function ApplicationData(props: ApplicationDataProps) {
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
                        <th>PARCIALIDADES</th>
                        <th>PAGO INICIAL</th>
                        <th>COSTO EQUIPO</th>
                        <th>EQUIPO MAS IVA</th>
                        <th>MONTO TOTAL</th>
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
                            <p>${formatAmount(props.application.application.initialPayment)}</p>
                        </td>
                        <td>
                            <p>N/A</p>
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