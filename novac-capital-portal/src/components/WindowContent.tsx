import Navbar from "./Navbar";

type WindowContentProps = {
    children: React.ReactNode,
};

function WindowContent(props: WindowContentProps) {
    return (
        <div id="app-container">
            <Navbar />
            {props.children}
        </div>
    );
}

export default WindowContent;