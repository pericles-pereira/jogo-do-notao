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
        <GuestLayout title="Email Verification">
            <div className="mb-4 text-sm text-gray-600">
                <Typography>
                    Thanks for signing up! Before getting started, could you verify your email address by clicking on the
                    link we just emailed to you? If you didn't receive the email, we will gladly send you another.
                </Typography>
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    <Typography>
                        A new verification link has been sent to the email address you provided during registration.
                    </Typography>
                </div>
            )}

            <form onSubmit={submit}>
                <div className="mt-4 flex items-center justify-between">
                    <DefaultButton size="medium" disabled={processing}>Resend Verification Email</DefaultButton>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <Typography>
                            Log Out
                        </Typography>
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
