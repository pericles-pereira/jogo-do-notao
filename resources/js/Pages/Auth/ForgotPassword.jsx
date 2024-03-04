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
        <GuestLayout title="Forgot Password" >
            <div className="mb-4 text-sm text-gray-600">
                <Typography>Forgot your password? No problem. Just let us know your email address and we will email you a password
                reset link that will allow you to choose a new one.</Typography>
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
                        <Typography>Email Password Reset Link</Typography>
                    </DefaultButton>
                </div>
            </form>
        </GuestLayout>
    );
}
