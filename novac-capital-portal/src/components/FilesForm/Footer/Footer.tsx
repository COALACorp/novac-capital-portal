import Contact from "./Contact";
import WhatsAppButton from "./WhatsAppButton";

function Footer() {
    return (
        <div id="footer">
            <p>Si tienes alguna duda te puedes comunicar con nosotros de las siguientes maneras:</p>
            <Contact />
            <WhatsAppButton />
        </div>
    );
}

export default Footer;