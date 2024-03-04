import styled from "@emotion/styled";
import MuiDrawer from "@mui/material/Drawer";
import menu from "@/config/navbar/menu";
import MenuItens from "@/Components/Template/Sidebar/MenuItens/MenuItens";
import logo from "@/assets/images/logos/logo138x48.svg";
import { useDrawer } from "@/Context/DrawerContext";
import { Link } from "@inertiajs/react";

export const drawerWidth = 250;

export default function Sidebar({ permissions }) {
    const { open, openByClick, defineOpenState } = useDrawer();

    return (
        <Drawer
            variant="permanent"
            open={open}
            onMouseEnter={() => !openByClick && defineOpenState(true)}
            onMouseLeave={() => !openByClick && defineOpenState(false)}
        >
            <div
                className="flex justify-center items-center"
                style={{ width: `${drawerWidth}px`, height: "64px" }}
            >
                <Link href="/" style={{ width: "138px", height: "48px" }}>
                    {/* <img
                        src={logo}
                        alt="Logo"
                        style={{ width: "138px", height: "48px" }}
                    /> */}
                </Link>
            </div>

            <MenuItens menu={menu(permissions)} />
        </Drawer>
    );
}


const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
        background: theme.palette.linearGradientNavbarColor,
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: "border-box",
        overflowX: "hidden",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        boxShadow: "3px 0 10px rgba(0, 0, 0, 0.5)",
        ...(!open && {
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up("sm")]: {
                width: theme.spacing(9),
            },
        }),
    },
}));
