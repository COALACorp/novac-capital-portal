import { useState, useEffect, ChangeEvent } from "react";

type UploadFileButtonProps = {
    name: string,
    number?: number,
    onChange?: (file: File|undefined) => void,
};

function UploadFileButton(props: UploadFileButtonProps) {
    const [file, setFile] = useState<File>();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFile(event.target.files ? event.target.files[0] : undefined);
    };

    useEffect(() => {
        props.onChange && props.onChange(file);
    }, [file]);

    return (
        <label className="file-input-action" htmlFor={"file-" + props.name}>
            <p>{"Subir " + (props.number || "")}</p>
            <svg width="15" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.4687 4.07425L11.3228 0.928752C10.9853 0.591252 10.5278 0.400002 10.052 0.400002H2.39972C1.40635 0.403752 0.600098 1.21 0.600098 2.20338V17.8004C0.600098 18.7938 1.40635 19.6 2.39972 19.6H13.1975C14.1912 19.6 15.0001 18.7938 15.0001 17.8004V5.34888C15.0001 4.873 14.8062 4.41175 14.4687 4.07425ZM10.1982 2.34963L13.0516 5.20263H10.1982V2.34963ZM13.2001 17.8004H2.39972V2.20338H8.3986V6.10263C8.3986 6.60138 8.79985 7.00225 9.2986 7.00225H13.2001V17.8004ZM7.46185 8.94213L4.75022 11.6335C4.46522 11.9163 4.66547 12.403 5.0671 12.403H6.9001V15.553C6.9001 15.8016 7.10147 16.003 7.3501 16.003H8.2501C8.49872 16.003 8.7001 15.8016 8.7001 15.553V12.403H10.5331C10.9347 12.403 11.135 11.9166 10.85 11.6335L8.13835 8.94213C7.95122 8.7565 7.64897 8.7565 7.46185 8.94213Z" fill="black"/>
            </svg>
            <input id={"file-" + props.name} type="file" accept="image/*,.pdf,.docx,.zip" onChange={handleChange} />
        </label>
    );
}

export default UploadFileButton;