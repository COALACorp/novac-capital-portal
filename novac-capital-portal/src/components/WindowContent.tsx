import Box from "@mui/material/Box";

import Navbar from "./Navbar/Navbar";

type WindowContentProps = {
    children: React.ReactNode,
};

function WindowContent(props: WindowContentProps) {
    return (
        <Box id="app-container">
            <Navbar />
            {props.children}
        </Box>
    );
}

export default WindowContent;