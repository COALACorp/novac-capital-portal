import { SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

type ErrorProps = {
    error?: string,
    sx?: SxProps,
    [key: string]: any,
};

const Error: React.FC<ErrorProps> = (props) => {
    return (
        <Box
            sx={{
                height: "100vh",
                backgroundColor: "#F0F2F5",
                color: "#667A99",
                fontSize: "1.5rem",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                ...props.sx,
            }}
        >
            <ErrorOutlineIcon
                sx={{
                    color: "#52617A",
                    fontSize: "8rem",
                }}
            />
            <Box
                sx={{
                    fontSize: "2.5rem",
                    fontWeight: "bold",
                }}
            >
                Uh oh!
            </Box>
            <Box>
                Ocurrió un error mientras se cargaba la información.
            </Box>
            <Box
                sx={{
                    color: "#8594AD",
                    fontSize: "1.2rem",
                }}
            >
                Vuelve a cargar la página para intentarlo de nuevo.
            </Box>
            {props.error && (
                <Box
                    sx={{
                        marginTop: "3rem",
                        color: "#8594AD",
                        fontSize: "1.2rem",
                    }}
                >
                    <b>Error:</b> <i>{props.error}</i>
                </Box>
            )}
        </Box>
    );
};

export default Error;