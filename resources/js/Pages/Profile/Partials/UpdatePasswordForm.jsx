// UpdatePasswordForm
import * as React from "react";
import { Collapse, Paper, TextField, Typography } from "@mui/material";
import { useForm } from "@inertiajs/react";
import InputError from "@/Components/Form/InputError";
import DefaultButton from "@/Components/Form/DefaultButton";

export default function UpdatePasswordForm() {
    const passwordInput = React.useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset("current_password");
                    passwordInput.current.focus();
                }
            },
        });
    };

    return (
        <form onSubmit={updatePassword} className="mt-6 space-y-6">
            <div>
                <TextField
                    id="current_password"
                    label="Current Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    required
                    value={data.current_password}
                    onChange={(e) =>
                        setData("current_password", e.target.value)
                    }
                    error={!!errors.current_password}
                />
                <InputError
                    message={errors.current_password}
                    className="flex justify-start"
                />
            </div>

            <div>
                <TextField
                    id="password"
                    label="New Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    required
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                    error={!!errors.password}
                    sx={{ mt: "8px" }}
                />
                <InputError
                    message={errors.password}
                    className="flex justify-start"
                />
            </div>

            <div>
                <TextField
                    id="password_confirmation"
                    label="Confirm Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    required
                    value={data.password_confirmation}
                    onChange={(e) =>
                        setData("password_confirmation", e.target.value)
                    }
                    error={!!errors.password_confirmation}
                    sx={{ mt: "8px" }}
                />
                <InputError
                    message={errors.password_confirmation}
                    className="flex justify-start"
                />
            </div>

            <div className="flex items-center gap-4 mt-8">
                <DefaultButton disabled={processing}>Save</DefaultButton>

                <Collapse in={recentlySuccessful}>
                    <Typography variant="body2" className="text-gray-600">
                        Saved.
                    </Typography>
                </Collapse>
            </div>
        </form>
    );
}
