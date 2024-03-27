import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/Form/InputError';
import { Head, useForm } from '@inertiajs/react';
import { Typography } from '@mui/material';
import TextInput from '@/Components/Form/TextInput';
import DefaultButton from '@/Components/Form/DefaultButton';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout title="Esqueci Minha Senha" >
            <div className="mb-4 text-sm text-gray-600">
                <Typography>Esqueceu sua senha? Sem problemas. Basta nos informar seu endereço de e-mail e enviaremos um link de redefinição de senha
                que permitirá que você escolha uma nova senha.</Typography>
            </div>

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit}>
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
                />

                <InputError message={errors.email} className="mt-2" />

                <div className="flex items-center justify-end mt-4">
                    <DefaultButton size="medium" className="ms-4" disabled={processing}>
                        <Typography>Link de redefinição de senha</Typography>
                    </DefaultButton>
                </div>
            </form>
        </GuestLayout>
    );
}
