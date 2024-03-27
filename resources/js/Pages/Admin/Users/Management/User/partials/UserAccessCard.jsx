import { Button, Card, CardContent, Typography } from "@mui/material";

export default function UserAccessCard({ userActive, deactivateUser }) {
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
                            {userActive
                                ? "Desativar Usuário"
                                : "Ativar Usuário"}
                        </Typography>

                        <Typography
                            variant="body2"
                            className="mt-1 text-gray-600"
                        >
                            {userActive
                                ? "Desative o usuário e bloqueie seu acesso ao sistema."
                                : "Ative o usuário e permita seu acesso ao sistema."}
                        </Typography>
                    </header>
                    <div style={{ paddingTop: "16px" }}>
                        <Button
                            color={userActive ? "error" : "success"}
                            size="medium"
                            variant="contained"
                            onClick={deactivateUser}
                        >
                            {userActive
                                ? "Desativar Usuário"
                                : "Ativar Usuário"}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
