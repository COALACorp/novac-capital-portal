import Box from "@mui/material/Box";

import FileInput from "./FileInput/FileInput";

const files = [
    {
        label: "Aviso de privacidad",
        name: "endorsementPrivacyNotice",
        template: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
        label: "Formato de Autorización de Círculo de Crédito",
        name: "endorsementCreditCircleAuthorizationForm",
        template: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
        label: "Copia de Credencial de Elector y/o Pasaporte",
        name: "endorsementVoterIdentificationCardOrPassportCopy",
    },
    {
        label: "Comprobante de Domicilio Vigente",
        name: "endorsementCurrentAddressProof",
    },
];

function EndorsementRequirements() {
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

export default EndorsementRequirements;