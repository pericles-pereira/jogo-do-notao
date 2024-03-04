import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/Form/InputError';
import InputLabel from '@/Components/Form/InputLabel';
import TextInput from '@/Components/Form/TextInput';
import { useForm } from '@inertiajs/react';
import { Typography } from '@mui/material';
import DefaultButton from '@/Components/Form/DefaultButton';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('password.confirm'));
    };

    return (
        <GuestLayout title="Confirm Password">
            <div className="mb-4 text-sm text-gray-600">
                <Typography>
                    This is a secure area of the application. Please confirm your password before continuing.
                </Typography>
            </div>

            <form onSubmit={submit}>
                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <DefaultButton size="medium" className="ms-4" disabled={processing}>
                        <Typography>
                            Confirm
                        </Typography>
                    </DefaultButton>
                </div>
            </form>
        </GuestLayout>
    );
}
