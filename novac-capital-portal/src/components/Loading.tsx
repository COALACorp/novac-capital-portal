import { SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from '@mui/material/CircularProgress';

type LoadingProps = {
    sx?: SxProps,
    [key: string]: any,
};

const Loading: React.FC<LoadingProps> = (props) => {
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
            <CircularProgress
                size="8rem"
                sx={{
                    color: "#52617A",
                }}
            />
            <Box
                sx={{
                    fontSize: "2.5rem",
                    fontWeight: "bold",
                }}
            >
                Cargando...
            </Box>
            <Box>
                Espera mientras cargamos la información.
            </Box>
            <Box
                sx={{
                    color: "#8594AD",
                    fontSize: "1.2rem",
                }}
            >
                La pantalla se actualizará cuando la información esté lista.
            </Box>
        </Box>
    );
};

export default Loading;