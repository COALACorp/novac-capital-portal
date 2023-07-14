import Box from "@mui/material/Box";

import FileInput from "./FileInput/FileInput";

type FileSpec = {
    label: string,
    files: string[],
    template?: string,
};

const files: FileSpec[] = [
    {
        label: "Solicitud de financiamiento",
        files: [ "applicantFinancingRequest" ],
        template: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
        label: "Aviso de privacidad",
        files: [ "applicantPrivacyNotice" ],
        template: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
        label: "Formato de Autorización de Círculo de Crédito",
        files: [ "applicantCreditCircleAuthorizationForm" ],
        template: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
        label: "Copia de Credencial de Elector y/o Pasaporte",
        files: [ "applicantVoterIdentificationCardOrPassportCopy" ],
    },
    {
        label: "Comprobante de Domicilio Vigente",
        files: [ "applicantCurrentAddressProof" ],
    },
    {
        label: "Cédula de Identificación Fiscal de RFC, Alta ante SHCP",
        files: [ "applicantRFCFiscalIdentificationCard_RegistrationBeforeSHCP" ],
    },
    {
        label: "Tres últimos Estados de Cuenta",
        files: [
            "applicantThreeLastAccountStatements_1",
            "applicantThreeLastAccountStatements_2",
            "applicantThreeLastAccountStatements_3",
        ]
    },
];

function ApplicantRequirements() {
    return (
        <Box className="requirements-container">
            <p className="requirements-title strong">Requisitos del solicitante</p>
            <Box className="requirements-list">
                {files.map((file, index) => (
                    <FileInput
                        key={index}
                        label={file.label}
                        files={file.files}
                        templateUrl={file.template || undefined}
                    />
                ))}
            </Box>
        </Box>
    );
}

export default ApplicantRequirements;