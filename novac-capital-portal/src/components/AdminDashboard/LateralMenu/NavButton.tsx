import Image from "next/image";

type NavButtonProps = {
    name: string,
    icon: string,
    onClick?: () => void,
};

function NavButton(props: NavButtonProps) {
    return (
        <a className="nav-button" onClick={props.onClick}>
            <Image className="nav-button-icon" src={props.icon} width="16" height="16" alt={props.name + " icon"} />
            <p>{props.name}</p>
        </a>
    );
}

export default NavButton;