import DefaultButton from "@/Components/Form/DefaultButton";
import InputError from "@/Components/Form/InputError";
import { toast } from "@/utils/common/Toast";
import { useForm } from "@inertiajs/react";
import {
    Button,
    Card,
    CardContent,
    Modal,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";

export default function UserDeleteCard({ user, auth }) {
    const [open, setOpen] = useState(false);
    const {
        data,
        setData,
        delete: destroy,
        reset,
        errors,
        setError,
        clearErrors,
        processing,
    } = useForm({ password: "" });

    const closeModal = () => {
        setOpen(false);
        clearErrors();
    };

    const handleDelete = (e) => {
        e.preventDefault();
        if (data.password.length === 0) {
            setError(
                "password",
                "Campo vazio! Insira sua senha para prosseguir."
            );
            toast.error("Campo vazio! Insira sua senha para prosseguir.");
            return;
        }

        if (user?.id === auth?.user?.id) {
            setError("password", "Um usuário não pode deletar ele mesmo.");
            toast.error("Um usuário não pode deletar ele mesmo.");
            setOpen(false);
            return;
        }

        clearErrors();
        destroy(route("user.delete", user?.id), {
            preserveScroll: true,
            onError: () => reset(),
        });
    };

    return (
        <Card
            sx={{
                padding: "8px",
                marginBottom: "20px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
            }}
        >
            <CardContent
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                }}
            >
                <div>
                    <header
                        style={{
                            textAlign: "center",
                            padding: "2px",
                            gap: "2px",
                        }}
                    >
                        <Typography
                            variant="h6"
                            className="text-gray-900"
                            sx={{ marginBottom: "4px" }}
                        >
                            Deletar Usuário
                        </Typography>

                        <Typography
                            variant="body2"
                            className="mt-1 text-gray-600"
                            sx={{ maxWidth: "430px" }}
                        >
                            Depois que esta conta for excluída, todos os seus
                            recursos e dados serão excluídos permanentemente.
                            Antes de excluir esta conta, baixe quaisquer dados
                            ou informações que você deseja reter.
                        </Typography>
                    </header>
                    <div style={{ paddingTop: "16px" }}>
                        <DefaultButton
                            color="error"
                            size="medium"
                            onClick={() => {
                                if (user?.id === auth?.user?.id) {
                                    toast.error(
                                        "Um usuário não pode deletar ele mesmo."
                                    );
                                    return;
                                }
                                setOpen(true);
                            }}
                        >
                            Deletar Usuário
                        </DefaultButton>
                    </div>
                </div>
            </CardContent>
            <Modal
                open={open}
                onClose={closeModal}
                aria-labelledby="delete-account-modal-title"
                aria-describedby="delete-account-modal-description"
                className="flex justify-center items-center w-full h-full"
            >
                <form onSubmit={handleDelete}>
                    <Paper className="p-6">
                        <Typography
                            variant="h6"
                            id="delete-account-modal-title"
                        >
                            Confirmar Exclusão de Usuário
                        </Typography>
                        <Typography
                            variant="body1"
                            id="delete-account-modal-description"
                        >
                            Por favor, insira sua senha para confirmar a
                            exclusão deste usuário.
                        </Typography>
                        <TextField
                            label="Senha"
                            type="password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            fullWidth
                            margin="normal"
                            error={!!errors.password}
                            autoFocus
                        />
                        <InputError
                            message={errors.password}
                            className="flex justify-start"
                        />
                        <div className="flex justify-end gap-x-4 mt-3">
                            <DefaultButton
                                color="error"
                                size="medium"
                                disabled={processing}
                            >
                                Confirmar
                            </DefaultButton>
                            <Button
                                variant="contained"
                                color="inherit"
                                onClick={closeModal}
                            >
                                Sair
                            </Button>
                        </div>
                    </Paper>
                </form>
            </Modal>
        </Card>
    );
}
