import InputError from "@/Components/Form/InputError";
import TextInput from "@/Components/Form/TextInput";
import ApplicationLogo from "@/Components/Logo/ApplicationLogo";
import GameLayout from "@/Layouts/GameLayout";
import { textFieldFilters } from "@/utils/helpers/textFieldFilters";
import { Link, useForm } from "@inertiajs/react";
import { Button, InputLabel, Typography } from "@mui/material";

export default function RoomCode() {
    const { data, setData, post, processing, errors } = useForm({
        roomCode: "",
    });
    const { numbers } = textFieldFilters(setData);

    const submit = (e) => {
        e.preventDefault();

        post(route("room-code.store"));
    };

    return (
        <GameLayout title="Código da Sala">
            <div>
                <Link href="/">
                    <ApplicationLogo className="w-60 fill-current text-gray-500" />
                </Link>
            </div>

            <div
                className="w-full sm:max-w-md mt-4 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg"
                style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)" }}
            >
                <header className="text-center">
                    <Typography
                        variant="h5"
                        className="text-gray-900 font-bold"
                    >
                        Entrar na Sala
                    </Typography>

                    <Typography variant="body2" className="mt-1 text-gray-600">
                        Informe o código da sala para poder participar do jogo.
                    </Typography>
                </header>
                <form onSubmit={submit} className="mt-5">
                    <div>
                        <InputLabel htmlFor="roomCode" value="Código da Sala" />

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
        </GameLayout>
    );
}
