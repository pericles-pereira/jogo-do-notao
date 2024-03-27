import DefaultButton from '@/Components/Form/DefaultButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Typography } from '@mui/material';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout title="Verificar Email">
            <div className="mb-4 text-sm text-gray-600">
                <Typography>
                Olá! Antes de prosseguir, você poderia verificar seu endereço de e-mail clicando no botão
                que acabamos de enviar por e-mail para você? Se você não recebeu o e-mail, teremos prazer em lhe enviar outro.
                </Typography>
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    <Typography>
                    Um novo link de verificação foi enviado para o seu endereço de e-mail.
                    </Typography>
                </div>
            )}

            <form onSubmit={submit}>
                <div className="mt-4 flex items-center justify-between">
                    <DefaultButton size="medium" disabled={processing}>Reenviar Email de Verificação</DefaultButton>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <Typography>
                            Sair
                        </Typography>
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
