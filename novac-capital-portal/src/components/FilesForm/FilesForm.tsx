import "@/styles/filesform.css";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { GetApplication, APIUserApplicationsData } from "@/utils/api";
import FilesFormHead from "./FilesFormHead";
import { Status } from "./FilesPlan/FilesPlanStatus";
import ApplicantRequirements from "./ApplicantRequirements";
import EndorsementRequirements from "./EndorsementRequirements";
import Loading from "../Loading";
import Error from "../Error";

import { useAppSelector } from "@/app/hooks";
import { selectUser } from "@/features/user/userSlice";

function FilesForm() {
    const applicationId = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("id") : "";
    const user = useAppSelector(selectUser);
    const [application, setApplication] = useState<APIUserApplicationsData|null>();

    const handleSend = () => {
        console.log("Send clicked");
    };

    useEffect(() => {
        (async () => {
            if (user && applicationId) {
                const applicationData = await GetApplication(user.uid, Number(applicationId));
                if (applicationData)
                    setApplication(applicationData.data);
                else
                    setApplication(null);
            } else
                console.log("Can't retrieve application. User or applicationId is null:", applicationId, user);
        })();
    }, [user]);

    return application
        ? (
            <Box id="files-form-container">
                <FilesFormHead
                    months={application.applications[0].plan.dues}
                    applicant={application.user.name}
                    taxedEquipment={application.applications[0].cost}
                    taxedPartialities={application.applications[0].partiality}
                    status={application.applications[0].status as Status}
                />
                <ApplicantRequirements />
                <EndorsementRequirements />
                <Button id="files-form-submit" onClick={handleSend}>Enviar</Button>
            </Box>
        )
        : application === undefined ? <Loading /> : <Error error={"No se pudo cargar la información relacionada a la aplicación con ID: " + applicationId} />;
}

export default FilesForm;