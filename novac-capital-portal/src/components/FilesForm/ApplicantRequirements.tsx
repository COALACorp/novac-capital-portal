import Box from "@mui/material/Box";

import FileInput from "./FileInput/FileInput";

const files = [
    {
        label: "Solicitud de financiamiento",
        name: "applicantFinancingRequest",
        template: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
        label: "Aviso de privacidad",
        name: "applicantPrivacyNotice",
        template: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
        label: "Formato de Autorización de Círculo de Crédito",
        name: "applicantCreditCircleAuthorizationForm",
        template: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
        label: "Copia de Credencial de Elector y/o Pasaporte",
        name: "applicantVoterIdentificationCardOrPassportCopy",
    },
    {
        label: "Comprobante de Domicilio Vigente",
        name: "applicantCurrentAddressProof",
    },
    {
        label: "Cédula de Identificación Fiscal de RFC, Alta ante SHCP",
        name: "applicantRFCFiscalIdentificationCard_RegistrationBeforeSHCP",
    },
    {
        label: "Tres últimos Estados de Cuenta",
        name: "applicantThreeLastAccountStatements",
    },
];

function ApplicantRequirements() {
    return (
        <Box className="requirements-container">
            <p className="requirements-title strong">Requisitos del solicitante</p>
            {files.map((file, index) => (
                <FileInput
                    key={index}
                    label={file.label}
                    name={file.name}
                    templateUrl={file.template || undefined}
                />
            ))}
        </Box>
    );
}

export default ApplicantRequirements;