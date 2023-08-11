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

export const naturalPersonRequirements: RequirementsState = {
    applicantFiles: [
        {
            label: "Solicitud de financiamiento",
            files: [
                { name: "applicantFinancingRequest" },
            ],
            template: "PF_Solicitud_de_Financiamiento_NOVAC_23.pdf",
        },
        {
            label: "Aviso de privacidad",
            files: [
                { name: "applicantPrivacyNotice" },
            ],
            template: "PF-PM_Aviso_de_Privacidad_NOVAC_23.pdf",
        },
        {
            label: "Formato de Autorización de Círculo de Crédito",
            files: [
                { name: "applicantCreditCircleAuthorizationForm" },
            ],
            template: "PF-PM_Autorizacion_de_Buro_de_Credito_NOVAC_23.pdf",
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
            label: "Formato de Autorización de Círculo de Crédito",
            files: [
                { name: "endorsementCreditCircleAuthorizationForm" },
            ],
            template: "PF-PM_Autorizacion_de_Buro_de_Credito_NOVAC_23.pdf",
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
        {
            label: "Aviso de privacidad",
            files: [
                { name: "endorsementPrivacyNotice" },
            ],
            template: "PF-PM_Aviso_de_Privacidad_NOVAC_23.pdf",
        },
    ],
};

export const legalPersonRequirements: RequirementsState = {
    applicantFiles: [
        {
            label: "Solicitud de financiamiento",
            files: [
                { name: "applicantFinancingRequest" },
            ],
            template: "PM_Solicitud_de_Financiamiento_NOVAC_23.pdf",
        },
        {
            label: "Aviso de privacidad",
            files: [
                { name: "applicantPrivacyNotice" },
            ],
            template: "PF-PM_Aviso_de_Privacidad_NOVAC_23.pdf",
        },
        {
            label: "Formato de Autorización de Círculo de Crédito",
            files: [
                { name: "applicantCreditCircleAuthorizationForm" },
            ],
            template: "PF-PM_Autorizacion_de_Buro_de_Credito_NOVAC_23.pdf",
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
        {
            label: "Estados Financieros de los últimos dos ejercicios",
            files: [
                { name: "applicantTwoLastFinancialStatements_1" },
                { name: "applicantTwoLastFinancialStatements_2" },
            ],
        },
        {
            label: "Declaraciones de Impuestos de los últimos dos ejercicios",
            files: [
                { name: "applicantTwoLastTaxReturns_1" },
                { name: "applicantTwoLastTaxReturns_2" },
            ],
        },
        {
            label: "Acta Constitutiva y Poderes del Representante Legal",
            files: [
                { name: "applicantIncorporationArticlesAndLegalRepresentativePowers" },
            ],
        },
    ],
    endorsementFiles: [
        {
            label: "Formato de Autorización de Círculo de Crédito",
            files: [
                { name: "endorsementCreditCircleAuthorizationForm" },
            ],
            template: "PF-PM_Autorizacion_de_Buro_de_Credito_NOVAC_23.pdf",
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
        {
            label: "Aviso de privacidad",
            files: [
                { name: "endorsementPrivacyNotice" },
            ],
            template: "PF-PM_Aviso_de_Privacidad_NOVAC_23.pdf",
        },
    ],
};