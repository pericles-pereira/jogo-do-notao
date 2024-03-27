import { Check } from "@mui/icons-material";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useState } from "react";
import defaultProfileImage from "@/assets/images/users/default_profile_image.png";

export default function UserProfileCard({ user }) {
    const [copyState, setCopyState] = useState(false);

    return (
        <Card
            sx={{
                minHeight: "70vh",
                padding: "16px",
                mb: "16px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
            }}
        >
            <header style={{ textAlign: "center", padding: "4px" }}>
                <Typography variant="h4" className="text-gray-900">
                    Perfil de {user.name.split(" ")[0]}
                </Typography>
            </header>
            <CardContent>
                <div className="flex justify-center align-middle w-full mb-6">
                    <img
                        src={user?.profileImg ?? defaultProfileImage}
                        alt={`Foto de perfil de ${user.name.split(" ")[0]}`}
                        className="rounded-full w-64 h-64 object-cover"
                        style={{
                            border: "2px solid rgba(0, 0, 0, 0.4)",
                        }}
                    />
                </div>
                <Typography>
                    <strong>Nome:</strong> {user.name}
                </Typography>
                <Typography
                    sx={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <strong>Email:</strong>
                    <a
                        style={{
                            color: "#1976D2",
                            textDecoration: "underline",
                            cursor: "pointer",
                            position: "relative",
                            marginLeft: "4px",
                        }}
                        title="Clique para copiar"
                        onClick={async () => {
                            await navigator.clipboard.writeText(user.email);
                            setCopyState(true);
                            setTimeout(() => setCopyState(false), 3000);
                        }}
                    >
                        {user.email}
                    </a>
                    {copyState && (
                        <Box
                            size="small"
                            sx={{
                                color: "green",
                                marginLeft: "5px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                textAlign: "center",
                                gap: "2px",
                            }}
                        >
                            <Check fontSize="small" />{" "}
                            <span
                                style={{
                                    marginTop: "2px",
                                    fontSize: "14px",
                                }}
                            >
                                Copiado
                            </span>
                        </Box>
                    )}
                </Typography>
                <Typography>
                    <strong>Data de Criação:</strong> {user.createdAt}
                </Typography>
                <Typography>
                    <strong>Data de Verificação do Email:</strong>{" "}
                    {user.emailVerifiedAt ?? "--"}
                </Typography>
            </CardContent>
        </Card>
    );
}
