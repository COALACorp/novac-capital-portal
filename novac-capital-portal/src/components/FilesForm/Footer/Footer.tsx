import Box from "@mui/material/Box";

import Contact from "./Contact";
import WhatsAppButton from "./WhatsAppButton";

function Footer() {
    return (
        <Box id="footer">
            <p>Si tienes alguna duda te puedes comunicar con nosotros de las siguientes maneras:</p>
            <Contact />
            <WhatsAppButton />
        </Box>
    );
}

export default Footer;