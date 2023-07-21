import type { Status } from "@/components/FilesForm/FileInput/FileInput";

export type FileSpec = {
    name: string,
    uploaded?: boolean,
    status?: Status,
    fileName?: string,
    displayName?: string,
};

export type RequirementSpec = {
    label: string,
    files: FileSpec[],
    template?: string,
};

export type RequirementsState = {
    applicantFiles: RequirementSpec[],
    endorsementFiles: RequirementSpec[],
};

export const requirements: RequirementsState = {
    applicantFiles: [
        {
            label: "Solicitud de financiamiento",
            files: [
                { name: "applicantFinancingRequest" },
            ],
            template: "Solicitud_financiamiento_PF_NOVAC_23.pdf",
        },
        {
            label: "Aviso de privacidad",
            files: [
                { name: "applicantPrivacyNotice" },
            ],
            template: "Aviso_de_Privacidad_Novac_Capital_2023.pdf",
        },
        {
            label: "Formato de Autorización de Círculo de Crédito",
            files: [
                { name: "applicantCreditCircleAuthorizationForm" },
            ],
            template: "Autorizacion_de_Buro_de_Credito_PF-PM_NOVAC_23.pdf",
        },
        {
            label: "Copia de Credencial de Elector y/o Pasaporte",
            files: [
                { name: "applicantVoterIdentificationCardOrPassportCopy" },
            ],
        },
        {
            label: "Comprobante de Domicilio Vigente",
            files: [
                { name: "applicantCurrentAddressProof" },
            ],
        },
        {
            label: "Cédula de Identificación Fiscal de RFC, Alta ante SHCP",
            files: [
                { name: "applicantRFCFiscalIdentificationCard_RegistrationBeforeSHCP" },
            ],
        },
        {
            label: "Tres últimos Estados de Cuenta",
            files: [
                { name: "applicantThreeLastAccountStatements_1" },
                { name: "applicantThreeLastAccountStatements_2" },
                { name: "applicantThreeLastAccountStatements_3" },
            ],
        },
    ],
    endorsementFiles: [
        {
            label: "Aviso de privacidad",
            files: [
                { name: "endorsementPrivacyNotice" },
            ],
            template: "Aviso_de_Privacidad_Novac_Capital_2023.pdf",
        },
        {
            label: "Formato de Autorización de Círculo de Crédito",
            files: [
                { name: "endorsementCreditCircleAuthorizationForm" },
            ],
            template: "Autorizacion_de_Buro_de_Credito_PF-PM_NOVAC_23.pdf",
        },
        {
            label: "Copia de Credencial de Elector y/o Pasaporte",
            files: [
                { name: "endorsementVoterIdentificationCardOrPassportCopy" },
            ],
        },
        {
            label: "Comprobante de Domicilio Vigente",
            files: [
                { name: "endorsementCurrentAddressProof" },
            ],
        },
    ],
};

export default requirements;