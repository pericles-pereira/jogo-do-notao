import * as React from "react";
import { LinearProgress, TextField, Typography } from "@mui/material";
import { useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import InputError from "@/Components/Form/InputError";
import DefaultButton from "@/Components/Form/DefaultButton";
import { toast } from "@/utils/common/Toast";

export default function UpdateProfileInformationForm({
    mustVerifyEmail,
    status,
}) {
    const user = usePage().props.auth.user;
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const { post } = useForm([]);

    const [sendingEmailVerification, setSendingEmailVerification] =
        React.useState(false);

    React.useEffect(() => {
        if (status === "verification-link-sent") {
            toast.success(
                "Um novo link de verificação foi enviado para o seu endereço de email."
            );
            setSendingEmailVerification(false);
        }
    }, [status]);

    const submit = (e) => {
        e.preventDefault();
        patch(route("profile.update"), { preserveScroll: true });
    };

    const sendEmailVerificationNotification = (e) => {
        e.preventDefault();
        setSendingEmailVerification(true);
        post(route("verification.send"), { preserveScroll: true });
    };

    return (
        <form onSubmit={submit} className="mt-6 space-y-6">
            <div>
                <TextField
                    id="name"
                    name="name"
                    value={data.name}
                    fullWidth
                    onChange={(e) => setData("name", e.target.value)}
                    error={!!errors.name}
                    required
                    variant="outlined"
                    label="Nome"
                />
                <InputError
                    message={errors.name}
                    className="flex justify-start"
                />
            </div>

            <div>
                <TextField
                    id="email"
                    label="Email"
                    name="email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    required
                    autoComplete="username"
                    error={!!errors.email}
                    sx={{ mt: "16px" }}
                />
                <InputError
                    message={errors.email}
                    className="flex justify-start"
                />
            </div>

            {mustVerifyEmail && user.email_verified_at === null && (
                <div style={{ marginTop: "8px" }}>
                    <Typography variant="body1" className="text-gray-950">
                        Seu endereço de e-mail não foi verificado.
                        <span
                            onClick={sendEmailVerificationNotification}
                            disabled={sendingEmailVerification}
                            className="underline ml-1 text-gray-700 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            style={{
                                textDecorationColor: "steelblue",
                                cursor: "pointer",
                            }}
                        >
                            Clique aqui para reenviar o e-mail de verificação.
                        </span>
                    </Typography>
                    {sendingEmailVerification && (
                        <div className="flex items-center justify-center p-2">
                            <LinearProgress className="w-9/12" />
                        </div>
                    )}

                    {status === "verification-link-sent" &&
                        !sendingEmailVerification && (
                            <Typography
                                variant="body1"
                                className="mt-2 font-medium text-green-600"
                            >
                                Um novo link de verificação foi enviado para o
                                seu endereço de email.
                            </Typography>
                        )}
                </div>
            )}

            <div className="flex items-center gap-4">
                <DefaultButton disabled={processing}>Salvar</DefaultButton>

                <Transition
                    show={recentlySuccessful}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                >
                    <Typography variant="body2" className="text-gray-600">
                        Salvo.
                    </Typography>
                </Transition>
            </div>
        </form>
    );
}
