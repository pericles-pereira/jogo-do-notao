import { Link } from "@inertiajs/react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
    AppBar,
    Button,
    Toolbar,
    Typography,
    Popover,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    useMediaQuery,
} from "@mui/material";
import { useState } from "react";

export default function GameAppBar({ games }) {
    const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
    const [rankingMenuAnchor, setRankingMenuAnchor] = useState(null);
    const isMobile = useMediaQuery("(max-width:428px)");
    const isTablet = useMediaQuery("(max-width:800px)");

    const handleMobileMenuOpen = (event) => {
        setMobileMenuAnchor(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMenuAnchor(null);
    };

    const handleRankingMenuOpen = (event) => {
        setRankingMenuAnchor(event.currentTarget);
    };

    const handleRankingMenuClose = () => {
        setRankingMenuAnchor(null);
    };

    return (
        <AppBar
            position="absolute"
            sx={{
                backgroundColor: "white",
                boxShadow: "rgba(0, 0, 0, 0.5) 0px 4px 10px",
            }}
        >
            <Toolbar
                className={
                    isTablet ? (isMobile ? "gap-x-0" : "gap-x-4") : "gap-x-8"
                }
            >
                <div style={{ flexGrow: 1 }} />
                {isMobile ? (
                    <>
                        <Button
                            variant="text"
                            onClick={handleMobileMenuOpen}
                            className="text-nowrap"
                            sx={{
                                color: "#262626",
                                ":hover": {
                                    color: "#262626",
                                    textDecoration: "underline",
                                },
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    textTransform: "none",
                                    color: "#262626",
                                }}
                            >
                                Menu
                                {Boolean(mobileMenuAnchor) ? (
                                    <ExpandLess
                                        className="ml-0.5 mb-0.5"
                                        sx={{ color: "#262626" }}
                                    />
                                ) : (
                                    <ExpandMore
                                        className="ml-0.5 mb-0.5"
                                        sx={{ color: "#262626" }}
                                    />
                                )}
                            </Typography>
                        </Button>
                        <Popover
                            open={Boolean(mobileMenuAnchor)}
                            anchorEl={mobileMenuAnchor}
                            onClose={handleMobileMenuClose}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "center",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "center",
                            }}
                        >
                            <List>
                                <ListItemButton
                                    LinkComponent={Link}
                                    href="/home"
                                >
                                    <Typography
                                        variant="subtitle1"
                                        sx={{
                                            textTransform: "none",
                                            color: "#262626",
                                        }}
                                        className="flex"
                                    >
                                        Home
                                    </Typography>
                                </ListItemButton>

                                <ListItemButton onClick={handleRankingMenuOpen}>
                                    <Typography
                                        variant="subtitle1"
                                        sx={{
                                            textTransform: "none",
                                            color: "#262626",
                                        }}
                                        className="flex"
                                    >
                                        Ranking
                                        {Boolean(rankingMenuAnchor) ? (
                                            <ExpandLess />
                                        ) : (
                                            <ExpandMore />
                                        )}
                                    </Typography>
                                </ListItemButton>
                                <Popover
                                    open={Boolean(rankingMenuAnchor)}
                                    anchorEl={rankingMenuAnchor}
                                    onClose={handleRankingMenuClose}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "center",
                                    }}
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "center",
                                    }}
                                    className="mt-10"
                                >
                                    <List>
                                        {games.map(({ acronym, id }) => (
                                            <ListItemButton
                                                key={id}
                                                component={Link}
                                                href={route("ranking", {
                                                    gameAcronym: acronym,
                                                })}
                                            >
                                                <Typography
                                                    variant="subtitle2"
                                                    sx={{
                                                        textTransform: "none",
                                                        color: "#262626",
                                                    }}
                                                    className="flex"
                                                >
                                                    {acronym}
                                                </Typography>
                                            </ListItemButton>
                                        ))}
                                    </List>
                                </Popover>

                                <ListItemButton
                                    LinkComponent={Link}
                                    href={route("university-help-code")}
                                >
                                    <Typography
                                        variant="subtitle1"
                                        sx={{
                                            textTransform: "none",
                                            color: "#262626",
                                        }}
                                        className="flex"
                                    >
                                        Ajuda Universitária
                                    </Typography>
                                </ListItemButton>

                                <ListItemButton
                                    LinkComponent={Link}
                                    href={route("login")}
                                >
                                    <Typography
                                        variant="subtitle1"
                                        sx={{
                                            textTransform: "none",
                                            color: "#262626",
                                        }}
                                        className="flex"
                                    >
                                        Login
                                    </Typography>
                                </ListItemButton>
                            </List>
                        </Popover>
                    </>
                ) : (
                    <>
                        <Link href="/home">
                            <Button
                                variant="text"
                                sx={{
                                    color: "#262626",
                                    ":hover": {
                                        color: "#262626",
                                        textDecoration: "underline",
                                    },
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        textTransform: "none",
                                        color: "#262626",
                                    }}
                                >
                                    Home
                                </Typography>
                            </Button>
                        </Link>

                        <Button
                            variant="text"
                            sx={{
                                color: "#262626",
                                ":hover": {
                                    color: "#262626",
                                    textDecoration: "underline",
                                },
                            }}
                            onClick={handleRankingMenuOpen}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    textTransform: "none",
                                    color: "#262626",
                                }}
                                className="flex"
                            >
                                Ranking
                                {Boolean(rankingMenuAnchor) ? (
                                    <ExpandLess className="mt-1" />
                                ) : (
                                    <ExpandMore className="mt-1" />
                                )}
                            </Typography>
                        </Button>
                        <Popover
                            open={Boolean(rankingMenuAnchor)}
                            anchorEl={rankingMenuAnchor}
                            onClose={handleRankingMenuClose}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "center",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "center",
                            }}
                        >
                            <List>
                                {games.map(({ acronym, id }) => (
                                    <ListItemButton
                                        key={id}
                                        component={Link}
                                        href={route("ranking", {
                                            gameAcronym: acronym,
                                        })}
                                    >
                                        <Typography
                                            variant="subtitle1"
                                            sx={{
                                                textTransform: "none",
                                                color: "#262626",
                                            }}
                                            className="flex"
                                        >
                                            {acronym}
                                        </Typography>
                                    </ListItemButton>
                                ))}
                            </List>
                        </Popover>

                        <Link href={route("university-help-code")}>
                            <Button
                                variant="text"
                                sx={{
                                    color: "#262626",
                                    ":hover": {
                                        color: "#262626",
                                        textDecoration: "underline",
                                    },
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        textTransform: "none",
                                        color: "#262626",
                                    }}
                                    className="flex"
                                >
                                    Ajuda Universitária
                                </Typography>
                            </Button>
                        </Link>

                        <Link href={route("login")}>
                            <Button
                                variant="text"
                                sx={{
                                    color: "#262626",
                                    ":hover": {
                                        color: "#262626",
                                        textDecoration: "underline",
                                    },
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        textTransform: "none",
                                        color: "#262626",
                                    }}
                                    className="flex"
                                >
                                    Login
                                </Typography>
                            </Button>
                        </Link>
                        <div style={{ flexGrow: 1 }} />
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
}
