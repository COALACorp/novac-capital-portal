import Box from "@mui/material/Box";

import FileInput from "./FileInput/FileInput";

const files = [
    {
        label: "Aviso de privacidad",
        files: [ "endorsementPrivacyNotice" ],
        template: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
        label: "Formato de Autorización de Círculo de Crédito",
        files: [ "endorsementCreditCircleAuthorizationForm" ],
        template: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
        label: "Copia de Credencial de Elector y/o Pasaporte",
        files: [ "endorsementVoterIdentificationCardOrPassportCopy" ],
    },
    {
        label: "Comprobante de Domicilio Vigente",
        files: [ "endorsementCurrentAddressProof" ],
    },
];

function EndorsementRequirements() {
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

export default EndorsementRequirements;