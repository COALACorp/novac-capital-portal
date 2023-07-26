import WindowContent from "@/components/WindowContent";
import FilesForm from "@/components/FilesForm/FilesForm";
import Footer from "@/components/FilesForm/Footer/Footer";

export default function FilesFormWindow() {
    return (
        <WindowContent>
            <FilesForm />
            <Footer />
        </WindowContent>
    );
}