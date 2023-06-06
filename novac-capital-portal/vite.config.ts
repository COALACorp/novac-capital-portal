import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
    const config = {
        plugins: [react()],
        base: "/",
        build: {
            target: "esnext",
        }
    };

    if (command !== "serve")
        config.base = "/novac-capital-portal/";

    return config;
});
