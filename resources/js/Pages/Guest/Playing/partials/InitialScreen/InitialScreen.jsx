import ApplicationLogo from "@/Components/Logo/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { Button, Typography } from "@mui/material";

export default function InitialScreen({
    playerName,
    initializeGame,
    gameStarted,
}) {
    return (
        <>
            <div>
                <Link href="/">
                    <ApplicationLogo className="w-60 fill-current text-gray-500" />
                </Link>
            </div>

            <div className="w-full sm:max-w-md px-2 lg:px-0">
                <div
                    className="w-full sm:max-w-md lg:px-6 lg:py-4 px-3 py-2.5 bg-white shadow-md overflow-hidden rounded-lg"
                    style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)" }}
                >
                    <header className="text-center">
                        <Typography
                            variant="h5"
                            className="text-gray-900 font-bold"
                        >
                            Olá, {playerName}
                        </Typography>

                        <Typography
                            variant="body2"
                            className="mt-1 text-gray-600"
                        >
                            Clique para iniciar a partida.
                        </Typography>
                    </header>
                    <div className="flex items-center justify-center mt-8">
                        <Button
                            size="large"
                            color="secondary"
                            className="ms-4"
                            type="button"
                            variant="contained"
                            onClick={initializeGame}
                            disabled={gameStarted}
                        >
                            <Typography>Iniciar Partida</Typography>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
