import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import "@/styles/form.css";

type FormHeadingProps = {
    title: string,
    subtitle?: string,
};

function FormHeading(props: FormHeadingProps) {
    return (
        <Box id="form-heading-container">
            <Stack id="form-heading">
                <h1 className="strong">
                    {props.title}
                </h1>
                {props.subtitle && (
                    <h2>
                        {props.subtitle}
                    </h2>
                )}
            </Stack>
        </Box>
    );
}

export default FormHeading;