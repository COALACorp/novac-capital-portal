import Image from "next/image";
import Box from "@mui/material/Box";

type NavButtonProps = {
    name: string,
    icon: string,
    onClick?: () => void,
};

function NavButton(props: NavButtonProps) {
    return (
        <Box className="nav-button" component="a" onClick={props.onClick}>
            <Image className="nav-button-icon" src={props.icon} width="16" height="16" alt={props.name + " icon"} />
            <p>{props.name}</p>
        </Box>
    );
}

export default NavButton;