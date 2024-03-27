import styled from "@emotion/styled";
import { Link } from "@inertiajs/react";
import {
    Avatar,
    Box,
    Button,
    Collapse,
    IconButton,
    Paper,
    Typography,
} from "@mui/material";

export default function ProfileCollapse({
    userName,
    profileImg,
    openProfile,
    setOpenProfile,
}) {
    return (
        <ProfileCollapseStyled
            in={openProfile}
            timeout="auto"
            unmountOnExit
            onMouseLeave={() => setOpenProfile(false)}
        >
            <Paper
                className="py-2"
                sx={{
                    width: "280px",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Link href="/profile">
                    <IconButton sx={{ marginTop: "2px" }}>
                        <Avatar
                            alt="User Photo"
                            src={profileImg}
                            sx={{
                                width: 120,
                                height: 120,
                                border: "1px solid",
                                objectFit: "cover",
                            }}
                        />
                    </IconButton>
                </Link>
                <Typography variant="h6" className="py-1 text-center">
                    {userName}
                </Typography>
                <Box
                    className="py-3"
                    sx={{
                        display: "flex",
                        gap: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "end",
                        height: "100%",
                    }}
                >
                    <Link href={route("profile.edit")}>
                        <Button type="button" variant="contained" fullWidth>
                            Perfil
                        </Button>
                    </Link>
                    <Link href={route("logout")} method="post" as="div">
                        <Button
                            type="button"
                            variant="contained"
                            color="inherit"
                            fullWidth
                        >
                            Sair
                        </Button>
                    </Link>
                </Box>
            </Paper>
        </ProfileCollapseStyled>
    );
}

const ProfileCollapseStyled = styled(Collapse)({
    position: "fixed",
    top: "60px",
    right: "24px",
    zIndex: 1500,
});
