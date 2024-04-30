import InputError from "@/Components/Form/InputError";
import TextInput from "@/Components/Form/TextInput";
import ApplicationLogo from "@/Components/Logo/ApplicationLogo";
import GameLayout from "@/Layouts/GameLayout";
import { textFieldFilters } from "@/utils/helpers/textFieldFilters";
import { Link, useForm } from "@inertiajs/react";
import { ArrowDropDown, ExpandMore } from "@mui/icons-material";
import {
    AppBar,
    Button,
    InputLabel,
    Toolbar,
    Typography,
    Menu,
    MenuItem,
} from "@mui/material";
import { useState } from "react";

export default function RoomCode({ games }) {
    const { data, setData, post, processing, errors } = useForm({
        roomCode: "",
    });
    const { numbers } = textFieldFilters(setData);
    console.log(games);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const submit = (e) => {
        e.preventDefault();

        if (data.roomCode.length !== 4) return;

        post(route("room-code.store"));
    };

    return (
        <GameLayout title="Código da Sala">
            <AppBar
                position="absolute"
                className="rounded-b-lg"
                sx={{
                    backgroundColor: "white",
                    boxShadow: "rgba(0, 0, 0, 0.5) 0px 4px 10px",
                    maxWidth: "35%",
                    left: "32.5%",
                }}
            >
                <Toolbar className="gap-x-8">
                    <div style={{ flexGrow: 1 }} />
                    <Link href="/login">
                        <Button variant="text">
                            <Typography
                                variant="h6"
                                sx={{
                                    textTransform: "none",
                                    color: "#262626",
                                }}
                            >
                                Login
                            </Typography>
                        </Button>
                    </Link>

                    <Link href="/home">
                        <Button variant="text">
                            <Typography
                                variant="h6"
                                sx={{ textTransform: "none", color: "#262626" }}
                            >
                                Home
                            </Typography>
                        </Button>
                    </Link>

                    <Button variant="text" onClick={handleMenuClick}>
                        <Typography
                            variant="h6"
                            sx={{ textTransform: "none", color: "#262626" }}
                        >
                            Ranking
                            <ExpandMore
                                className="ml-0.5 mb-0.5"
                                sx={{ color: "#262626" }}
                            />
                        </Typography>
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        sx={{
                            boxShadow: "rgba(0, 0, 0, 0.9) 0px 4px 10px",
                        }}
                    >
                        {games.map(({ acronym, id }) => (
                            <Link
                                href={route("ranking", {
                                    gameAcronym: acronym,
                                })}
                                key={id}
                            >
                                <MenuItem>
                                    <Typography
                                        variant="subtitle1  "
                                        sx={{
                                            textTransform: "none",
                                            color: "#262626",
                                        }}
                                    >
                                        {acronym}
                                    </Typography>
                                </MenuItem>
                            </Link>
                        ))}
                    </Menu>
                    <div style={{ flexGrow: 1 }} />
                </Toolbar>
            </AppBar>
            <div>
                <Link href="/">
                    <ApplicationLogo className="w-60 fill-current text-gray-500" />
                </Link>
            </div>

            <div className="px-2 lg:px-0">
                <div
                    className="w-full sm:max-w-md lg:px-6 lg:py-4 px-3 py-2 bg-white shadow-md overflow-hidden rounded-lg"
                    style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)" }}
                >
                    <header className="text-center">
                        <Typography
                            variant="h5"
                            className="text-gray-900 font-bold"
                        >
                            Entrar na Sala
                        </Typography>

                        <Typography
                            variant="body2"
                            className="mt-1 text-gray-600"
                        >
                            Informe o código da sala para poder participar do
                            jogo.
                        </Typography>
                    </header>
                    <form onSubmit={submit} className="mt-5">
                        <div>
                            <InputLabel
                                htmlFor="roomCode"
                                value="Código da Sala"
                            />

                            <TextInput
                                id="roomCode"
                                name="roomCode"
                                value={data.roomCode}
                                className="mt-1 block w-full text-center text-lg border-gray-400"
                                style={{ fontSize: "40px" }}
                                isFocused={true}
                                onChange={(e) =>
                                    e.target.value.length < 5 && numbers(e)
                                }
                            />

                            <InputError
                                message={errors.roomCode}
                                className="mt-2"
                            />
                        </div>

                        <div className="flex items-center justify-end mt-4">
                            <Button
                                className="ms-4"
                                color="secondary"
                                type="submit"
                                variant="contained"
                                disabled={processing}
                            >
                                <Typography>Entrar</Typography>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </GameLayout>
    );
}
