import InputError from "@/Components/Form/InputError";
import TextInput from "@/Components/Form/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { textFieldFilters } from "@/utils/helpers/textFieldFilters";
import { useForm } from "@inertiajs/react";
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
        <GuestLayout title="Código da Sala">
            <header className="text-center">
                <Typography variant="h5" className="text-gray-900 font-bold">
                    Iniciar Partida
                </Typography>

                <Typography variant="body2" className="mt-1 text-gray-600">
                    Informe o código da sala para iniciar o jogo.
                </Typography>
            </header>
            <form onSubmit={submit} className="mt-5">
                <div>
                    <InputLabel htmlFor="roomCode" value="Código da Sala" />

                    <TextInput
                        id="roomCode"
                        name="roomCode"
                        value={data.roomCode}
                        className="mt-1 block w-full text-center text-lg"
                        style={{ fontSize: "40px" }}
                        isFocused={true}
                        onChange={(e) => e.target.value.length < 5 && numbers(e)}
                    />

                    <InputError message={errors.roomCode} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Button
                        className="ms-4"
                        color="success"
                        type="submit"
                        variant="contained"
                        disabled={processing}
                    >
                        <Typography>Iniciar</Typography>
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
}
