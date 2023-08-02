import { Status } from "./FileInput";
import { Download } from "@/utils/docsApi";

type DownloadFileActionProps = {
    uid: string,
    applicationId: string,
    uploaded?: boolean,
    fileName?: string,
    displayName?: string,
};

function DownloadFileAction(props: DownloadFileActionProps) {
    const handleGetDoc = async () => {
        if (props.uploaded && props.fileName) {
            const doc = await Download(props.uid, props.applicationId, props.fileName);
            if (doc)
                window.open(doc.url, "_blank", "noreferrer");
        }
    };

    return props.uploaded ? (
        <a
            className="file-input-action"
            onClick={handleGetDoc}
        >
            <p>{props.displayName}</p>
            <svg width="15" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path id="Vector" d="M8.3002 9.25263C8.3002 9.004 8.09882 8.80263 7.8502 8.80263H6.9502C6.70157 8.80263 6.5002 9.004 6.5002 9.25263V12.403H4.6672C4.26557 12.403 4.06532 12.8894 4.35032 13.1725L7.06195 15.8639C7.24907 16.0495 7.55095 16.0495 7.73807 15.8639L10.4497 13.1725C10.7347 12.8898 10.5344 12.403 10.1328 12.403H8.3002V9.25263ZM14.0688 4.07425L10.9229 0.928752C10.5854 0.591252 10.1279 0.400002 9.65207 0.400002H1.99982C1.00645 0.403752 0.200195 1.21 0.200195 2.20338V17.8004C0.200195 18.7937 1.00645 19.6 1.99982 19.6H12.7976C13.7913 19.6 14.6002 18.7937 14.6002 17.8004V5.34888C14.6002 4.873 14.4063 4.41175 14.0688 4.07425V4.07425ZM9.79832 2.34963L12.6517 5.20263H9.79832V2.34963V2.34963ZM12.8002 17.8004H1.99982V2.20338H7.9987V6.10263C7.9987 6.60138 8.39995 7.00225 8.8987 7.00225H12.8002V17.8004Z" fill="#26323D"/>
            </svg>
        </a>
    ) : (
        <div className="file-input-action">
            <p>Ningún archivo</p>
        </div>
    );
}

export default DownloadFileAction;