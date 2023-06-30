import "@/styles/globals.css";
import "@/styles/app.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import WindowContent from "@/components/WindowContent";

import store from "@/app/store";

const theme = createTheme({
    typography: {
        fontFamily: '"Poppins", "sans-serif"',
    },
    palette: {
        background: {
            default: "none",
        },
    },
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <WindowContent>
                    <Component {...pageProps} />
                </WindowContent>
            </ThemeProvider>
        </Provider>
    );
}
