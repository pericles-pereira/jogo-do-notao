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
                backgroundColor: "rgb(29,42,142)",
                height: "50px",
            }}
            elevation={8}
        >
            <Toolbar
                className={
                    isTablet ? (isMobile ? "gap-x-0" : "gap-x-4") : "gap-x-8"
                }
                sx={{ marginTop: "-8px", color: "white" }}
            >
                <div style={{ flexGrow: 1 }} />
                {isMobile ? (
                    <>
                        <Button
                            variant="text"
                            onClick={handleMobileMenuOpen}
                            className="mx-auto text-nowrap"
                            sx={{
                                color: "white",
                                ":hover": {
                                    color: "white",
                                    textDecoration: "underline",
                                },
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    textTransform: "none",
                                    color: "white",
                                }}
                            >
                                Menu
                                {Boolean(mobileMenuAnchor) ? (
                                    <ExpandLess className="ml-0.5 mb-0.5" />
                                ) : (
                                    <ExpandMore className="ml-0.5 mb-0.5" />
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
                                            color: "black",
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
                                            color: "black",
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
                                        <ListItemButton
                                            component={Link}
                                            href={route("ranking", {
                                                gameAcronym: "all",
                                            })}
                                        >
                                            <Typography
                                                variant="subtitle2"
                                                sx={{
                                                    textTransform: "none",
                                                    color: "black",
                                                }}
                                                className="flex"
                                            >
                                                Ranking Geral
                                            </Typography>
                                        </ListItemButton>
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
                                                        color: "black",
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
                                            color: "black",
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
                                            color: "black",
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
                                    color: "white",
                                    ":hover": {
                                        color: "white",
                                        textDecoration: "underline",
                                        bgcolor: "inherit",
                                    },
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        textTransform: "none",
                                        color: "white",
                                        fontSize: "16px",
                                    }}
                                >
                                    Home
                                </Typography>
                            </Button>
                        </Link>

                        <Button
                            variant="text"
                            sx={{
                                color: "white",
                                ":hover": {
                                    color: "white",
                                    textDecoration: "underline",
                                    bgcolor: "inherit",
                                },
                            }}
                            onClick={handleRankingMenuOpen}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    textTransform: "none",
                                    color: "white",
                                    fontSize: "16px",
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
                                <ListItemButton
                                    component={Link}
                                    href={route("ranking", {
                                        gameAcronym: "all",
                                    })}
                                >
                                    <Typography
                                        variant="subtitle1"
                                        sx={{
                                            textTransform: "none",
                                            color: "black",
                                        }}
                                        className="flex"
                                    >
                                        Ranking Geral
                                    </Typography>
                                </ListItemButton>
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
                                                color: "black",
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
                                    color: "white",
                                    ":hover": {
                                        color: "white",
                                        textDecoration: "underline",
                                        bgcolor: "inherit",
                                    },
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        textTransform: "none",
                                        color: "white",
                                        fontSize: "16px",
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
                                    color: "white",
                                    ":hover": {
                                        color: "white",
                                        textDecoration: "underline",
                                        bgcolor: "inherit",
                                    },
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        textTransform: "none",
                                        color: "white",
                                        fontSize: "16px",
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
