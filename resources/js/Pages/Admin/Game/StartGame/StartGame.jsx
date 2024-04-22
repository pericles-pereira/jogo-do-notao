import InputError from "@/Components/Form/InputError";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { textFieldFilters } from "@/utils/helpers/textFieldFilters";
import { useForm } from "@inertiajs/react";
import { West } from "@mui/icons-material";
import {
    Box,
    Button,
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function StartGame({ games, roomCode }) {
    const { data, setData, errors, post, reset } = useForm({
        name: "",
        gameId: "",
    });
    const [hasRoomCode, setHasRoomCode] = useState(false);

    useEffect(() => {
        if (roomCode) setHasRoomCode(true);
    }, [roomCode]);

    const submit = (e) => {
        e.preventDefault();

        post(route("game.start.store"), {
            preserveScroll: true,
            onSuccess: () => {
                reset("name");
            },
        });
    };

    const { text } = textFieldFilters(setData);

    return (
        <AuthenticatedLayout title="Iniciar Partida">
            <Container
                maxWidth="lg"
                sx={{
                    py: 8,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Grid
                    component="form"
                    id="register-form"
                    onSubmit={submit}
                    container
                    spacing={6}
                    sx={{ alignItems: "center", justifyContent: "center" }}
                >
                    <Grid item xs={12} md={10} lg={8}>
                        <Paper
                            elevation={3}
                            sx={{
                                padding: "16px",
                                mb: "16px",
                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
                            }}
                        >
                            {hasRoomCode ? (
                                <>
                                    <header className="text-center">
                                        <Typography
                                            variant="h3"
                                            className="text-gray-900"
                                        >
                                            Código da Sala:
                                        </Typography>
                                    </header>
                                    <div className="mt-8 space-y-6 text-center pt-1">
                                        <div className="w-full">
                                            <div>
                                                <Typography
                                                    variant="h4"
                                                    className="text-green-600"
                                                    sx={{
                                                        fontSize: "80px",
                                                        fontWeight: 400,
                                                    }}
                                                >
                                                    {roomCode}
                                                </Typography>
                                            </div>
                                        </div>
                                        <Box className="flex justify-start pt-4">
                                            <Button
                                                variant="contained"
                                                type="button"
                                                size="large"
                                                startIcon={<West />}
                                                onClick={() =>
                                                    setHasRoomCode(false)
                                                }
                                            >
                                                Iniciar Outro Jogo
                                            </Button>
                                        </Box>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <header className="text-center">
                                        <Typography
                                            variant="h6"
                                            className="text-gray-900"
                                        >
                                            Iniciar Partida
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            className="mt-1 text-gray-600"
                                        >
                                            Informe o nome do jogador - este
                                            será o nome apresentado no placar.
                                        </Typography>
                                    </header>
                                    <div className="mt-6 space-y-6">
                                        <div className="w-full flex gap-x-2">
                                            <div className="w-6/12 sm:w-full">
                                                <TextField
                                                    id="name"
                                                    name="name"
                                                    value={data.name}
                                                    fullWidth
                                                    autoFocus={!hasRoomCode}
                                                    onChange={text}
                                                    error={!!errors.name}
                                                    required
                                                    variant="outlined"
                                                    label="Nome do Jogador"
                                                />
                                                <InputError
                                                    message={errors.name}
                                                    className="flex justify-start"
                                                />
                                            </div>

                                            <div className="w-6/12">
                                                <FormControl
                                                    fullWidth
                                                    variant="outlined"
                                                    required
                                                    error={!!errors.gameId}
                                                    style={{
                                                        minWidth: "200px",
                                                    }}
                                                >
                                                    <InputLabel id="gameIdLabel">
                                                        Jogo
                                                    </InputLabel>
                                                    <Select
                                                        labelId="gameIdLabel"
                                                        id="gameId"
                                                        name="gameId"
                                                        value={data.gameId}
                                                        onChange={(e) =>
                                                            setData(
                                                                "gameId",
                                                                e.target.value
                                                            )
                                                        }
                                                        label="Jogo"
                                                        error={!!errors.gameId}
                                                        style={{
                                                            width: "100%",
                                                        }}
                                                    >
                                                        <MenuItem value="">
                                                            <em>Selecione</em>
                                                        </MenuItem>

                                                        {games.map((game) => (
                                                            <MenuItem
                                                                value={game?.id}
                                                                key={game?.id}
                                                            >
                                                                {game?.acronym +
                                                                    " - " +
                                                                    game?.name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                    <InputError
                                                        message={errors.gameId}
                                                        className="flex justify-start"
                                                    />
                                                </FormControl>
                                            </div>
                                        </div>
                                        <Box className="flex justify-end">
                                            <Button
                                                size="large"
                                                variant="contained"
                                                type="submit"
                                                color="success"
                                            >
                                                Iniciar
                                            </Button>
                                        </Box>
                                    </div>
                                </>
                            )}
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </AuthenticatedLayout>
    );
}
