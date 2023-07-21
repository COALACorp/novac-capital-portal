import "@/styles/filesform.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";

import { GetLastApplication, ApplicationData } from "@/utils/api";
import FilesFormHead from "./FilesFormHead";
import { Status as FileStatus } from "./FileInput/FileInputAction/FileInputAction";
import { Status as PlanStatus } from "./FilesPlan/FilesPlanStatus";
import RequirementsSection from "./RequirementsSection";
import Loading from "../Loading";
import Error from "../Error";

import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { setApplicationId } from "@/features/quotation/quotationSlice";
import { selectUser } from "@/features/user/userSlice";

type FileSpec = {
    name: string,
    uploaded?: boolean,
    status?: FileStatus,
    fileName?: string,
};

type RequirementSpec = {
    label: string,
    files: FileSpec[],
    template?: string,
};

type RequirementsState = {
    applicantFiles: RequirementSpec[],
    endorsementFiles: RequirementSpec[],
};

const defaultRequirementsState: RequirementsState = {
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

function FilesForm() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const [application, setApplication] = useState<ApplicationData|null>();
    const [requirements, setRequirements] = useState(defaultRequirementsState);

    const requestUploadedDocuments = () => {
        console.log("Request uploaded documents");
        if (application) {
            const newState = { ...requirements };
            Object.keys(newState).forEach(category => {
                const key = category as keyof (typeof newState);
                const newReqs = newState[key].map(requirement => {
                    const newReq = { ...requirement };
                    newReq.files = requirement.files.map(file => {
                        const doc = application.documents.find(doc => doc.name.includes(file.name));
                        const newFile = { ...file };
                        if (doc) {
                            newFile.uploaded = true;
                            newFile.status = doc.status;
                            newFile.fileName = doc.name
                        }
                        return newFile;
                    });
                    return newReq;
                });
                newState[key] = newReqs;
            });
            console.log("Parsed requirements:", newState);
            setRequirements(newState);
        }
    }

    useEffect(() => console.log("Requirements updated:", requirements), [requirements]);

    useEffect(requestUploadedDocuments, [application]);

    useEffect(() => {
        (async () => {
            if (user) {
                const applicationData = await GetLastApplication(user.uid);
                if (applicationData) {
                    dispatch(setApplicationId(applicationData.data.application.id));
                    setApplication(applicationData.data);
                    return;
                }
            } else
                console.log("Can't retrieve application. User is null:", user);
            router.push("/");
        })();
    }, [user]);

    return application
        ? (
            <Box id="files-form-container">
                <FilesFormHead
                    months={application.application.plan.dues}
                    applicant={application.application.name}
                    taxedPartialities={application.application.partiality}
                    status={application.application.status as PlanStatus}
                />
                <RequirementsSection title="Requisitos del solicitante" requirements={requirements.applicantFiles} onChange={requestUploadedDocuments} />
                <RequirementsSection title="Requisitos del Aval" requirements={requirements.endorsementFiles} onChange={requestUploadedDocuments} />
            </Box>
        )
        : application === undefined ? <Loading /> : <Error error={"No se pudo cargar la información relacionada a la aplicación"} />;
}

export default FilesForm;
export type { FileSpec, RequirementSpec };