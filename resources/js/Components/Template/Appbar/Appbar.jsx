import { Avatar, Badge, IconButton, Toolbar } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import styled from "@emotion/styled";
import { drawerWidth } from "../Sidebar/Sidebar";
import { useState } from "react";
import { useDrawer } from "@/Context/DrawerContext";
import ProfileCollapse from "./Partials/ProfileCollapse";
import defaultProfileImage from "@/assets/images/users/default_profile_image.png";

export default function Appbar({ user }) {
    const { open, openByClick, defineOpenByClickState } = useDrawer();
    const [openProfile, setOpenProfile] = useState(false);

    const handleDrawer = () => openByClick ? defineOpenByClickState(false) : defineOpenByClickState(true);

    const profileImg = user?.profile_img ?? defaultProfileImage;
    const userName = user?.name ?? 'user';

    return (
        <>
            <AppbarStyled position="absolute" open={open}>
                <Toolbar sx={{ pr: "24px", justifyContent: "space-between" }}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawer}
                        sx={{ marginRight: "36px", color: "black" }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <IconButton onClick={() => setOpenProfile(!openProfile)}>
                        <Badge badgeContent={4} color="primary"  >
                            <Avatar
                                alt="User Photo"
                                src={profileImg}
                                sx={{ width: 42, height: 42, objectFit: "cover" }}
                            />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppbarStyled>

            <ProfileCollapse
                userName={userName}
                profileImg={profileImg}
                openProfile={openProfile}
                setOpenProfile={setOpenProfile}
            />
        </>
    );
}

const AppbarStyled = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    backgroundColor: "white",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));
