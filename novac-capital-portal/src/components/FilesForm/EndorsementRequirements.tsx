import Box from "@mui/material/Box";

import FileInput from "./FileInput/FileInput";

const files = [
    {
        label: "Aviso de privacidad",
        files: [ "endorsementPrivacyNotice" ],
        template: "Aviso_de_Privacidad_Novac_Capital_2023.pdf",
    },
    {
        label: "Formato de Autorización de Círculo de Crédito",
        files: [ "endorsementCreditCircleAuthorizationForm" ],
        template: "Autorizacion_de_Buro_de_Credito_PF-PM_NOVAC_23.pdf",
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
            <p className="requirements-title strong">Requisitos del Aval</p>
            <Box className="requirements-list">
                {files.map((file, index) => (
                    <FileInput
                        key={index}
                        label={file.label}
                        files={file.files}
                        template={file.template || undefined}
                    />
                ))}
            </Box>
        </Box>
    );
}

export default EndorsementRequirements;