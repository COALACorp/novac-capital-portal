import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";

const region = "us-east-1";
const accessKeyId = "";
const secretAccessKey = "";

const client = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey,
    },
});

const GenerateFileUrl = async () => {
    console.log("Download file");
    const command = new GetObjectCommand({
        Bucket: "",
        Key: "",
    });

    try {
        const response = await client.send(command);
        const stream = await response.Body?.transformToWebStream();
        const reader = stream?.getReader();
        if (reader) {
            const chunks: Uint8Array[] = [];
            let chunk;

            while (!(chunk = await reader.read()).done) {
                chunks.push(chunk.value);
            }

            const blob = new Blob(chunks, { type: response.ContentType });
            const url = URL.createObjectURL(blob);

            return url;
        }

        // The Body object also has 'transformToByteArray' and 'transformToWebStream' methods.
        const str = await response.Body?.transformToString();
        console.log("File content:", str);
    } catch (err) {
        console.error("Error while downlaoding file:", err);
    }

    return null;
};

export { GenerateFileUrl };