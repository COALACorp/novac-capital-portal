import { useState, useEffect } from "react";

import UploadFileButton from "./UploadFileButton";
import RemoveFileButton from "./RemoveFileButton";
import FileAlertDialog from "./FileAlertDialog";
import { FileSpec } from "@/data/filesRequirements";
import { Status } from "../FileInput";

type UploadFileActionProps = {
    file: FileSpec,
    number?: number,
    status?: Status,
    disabled?: boolean,
    onChange?: (name: string, file: File|undefined) => void,
    onRemove?: (name: string) => boolean|Promise<boolean>,
};

function UploadFileAction(props: UploadFileActionProps) {
    const MAX_FILE_SIZE = Number(process.env.NEXT_PUBLIC_MAX_FILE_SIZE_MB) * 1000000;
    const [file, setFile] = useState<File>();
    const [uploaded, setUploaded] = useState<string|undefined>();
    const [loading, setLoading] = useState(false);
    const [dialog, setDialog] = useState(false);

    const handleChange = (newFile: File|undefined) => {
        // if (newFile && newFile.size > MAX_FILE_SIZE) {
        //     console.log(`File too large: ${newFile.size / 1048576}MB`);
        // }
        setFile(newFile);
    };

    const handleRemove = async () => {
        setLoading(true);
        if (
            (props.file.uploaded
                && props.file.fileName
                && props.onRemove
                && await props.onRemove(props.file.fileName)
            ) || file
        )
            setFile(undefined);
        else
            console.log("Failed to remove file");
        setLoading(false);
    };
    
    useEffect(() => {
        if (props.file.uploaded && props.file.displayName) {
            setFile(undefined);
            setUploaded(props.file.displayName);
        } else if (file)
            setUploaded(file.name);
        else
            setUploaded(undefined);
    }, [props.file, file]);

    useEffect(() => {
        if (file && file.size > MAX_FILE_SIZE)
            setDialog(true);
        else
            props.onChange && props.onChange(props.file.name, file);
    }, [file]);

    return (
        <>
            {uploaded
                ? <RemoveFileButton fileName={uploaded} status={props.status} onRemove={handleRemove} disabled={props.disabled || loading} />
                : <UploadFileButton name={props.file.name} number={props.number} onChange={handleChange} />
            }
            <FileAlertDialog
                title="Tamaño del archivo excedido"
                open={dialog}
                onClose={() => setDialog(false)}
            >
                El archivo que intenta subir supera el límite de tamaño de {MAX_FILE_SIZE / 1000000} MB permitido por nuestro sistema. Para continuar, le recomendamos comprimir el archivo en un formato .zip antes de subirlo. La compresión reducirá el tamaño del archivo y facilitará la carga.<br />
                Tenga en cuenta que solo aceptamos archivos en formato .zip para la subida.<br />
                <br />
                Aquí hay algunas sugerencias para comprimir su archivo:<br />
                <br />
                1. Utilice software de compresión: Puede utilizar herramientas como WinZip, 7-Zip o WinRAR en su computadora para comprimir el archivo en formato .zip antes de subirlo.<br />
                2. Comprima en mac: Selecciona el archivo que deseas comprimir, Haz clic derecho, selecciona “Comprimir”, Sube el archivo .zip.<br />
                3. Utilice servicios en línea: Hay varios sitios web gratuitos que ofrecen servicios de compresión de archivos en formato .zip en línea. Uno de los más populares es <a href="https://www.compress2go.com/" target="_blank">compress2go</a> para comprimir archivos en formato .zip.<br />
                <br />
                Por favor, comprima el archivo en formato .zip y luego intente subirlo nuevamente. Si tiene alguna pregunta o necesita ayuda adicional, no dude en ponerse en contacto con nuestro equipo de soporte.<br />
            </FileAlertDialog>
        </>
    );
}

export default UploadFileAction;