import * as React from "react";
import { Box, Modal, Paper, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { useForm } from "@inertiajs/react";
import DefaultButton from "@/Components/Form/DefaultButton";

export default function DeleteUserForm({ className = "" }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: "",
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        reset();
    };

    return (
        <Paper
            elevation={3}
            className={`space-y-6 ${className}`}
            sx={{ padding: "16px", mb: "16px", textAlign: "center" }}
        >
            <Box component="section" className={`space-y-6 ${className}`}>
                <header>
                    <Typography variant="h6" className="text-gray-900">
                        Delete Account
                    </Typography>

                    <Typography variant="body2" className="mt-1 text-gray-600">
                        Once your account is deleted, all of its resources and
                        data will be permanently deleted. Before deleting your
                        account, please download any data or information that
                        you wish to retain.
                    </Typography>
                </header>

                <DefaultButton onClick={confirmUserDeletion} color="error">
                    Delete Account
                </DefaultButton>

                <Modal open={confirmingUserDeletion} onClose={closeModal}>
                    <Paper className="p-6 mx-auto mt-20 max-w-md shadow-lg">
                        <Typography
                            variant="h6"
                            className="text-gray-900 mb-4 py-2"
                        >
                            Are you sure you want to delete your account?
                        </Typography>

                        <Typography
                            variant="body2"
                            className="text-gray-600 mb-6 py-2"
                        >
                            Once your account is deleted, all of its resources
                            and data will be permanently deleted. Please enter
                            your password to confirm you would like to
                            permanently delete your account.
                        </Typography>

                        <TextField
                            id="password"
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            error={!!errors.password}
                            helperText={errors.password}
                            className="mb-6 py-4 mt-4"
                        />

                        <Box
                            className="flex justify-end mt-7"
                            style={{ gap: 7 }}
                        >
                            <DefaultButton
                                type="button"
                                className="ms-3"
                                onClick={deleteUser}
                                color="error"
                                disabled={processing}
                            >
                                Delete Account
                            </DefaultButton>
                            <DefaultButton
                                type="button"
                                color="inherit"
                                onClick={closeModal}
                            >
                                Cancel
                            </DefaultButton>
                        </Box>
                    </Paper>
                </Modal>
            </Box>
        </Paper>
    );
}
